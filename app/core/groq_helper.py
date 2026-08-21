import time
import asyncio
import re
import json
from typing import Any

def parse_json_from_response(text: str) -> Any:
    if not text:
        raise ValueError("Empty response text")
    cleaned = text.strip()
    if "```" in cleaned:
        pattern = r"```(?:json)?\s*([\s\S]*?)\s*```"
        matches = re.findall(pattern, cleaned)
        if matches:
            cleaned = matches[-1].strip()
    try:
        return json.loads(cleaned, strict=False)
    except json.JSONDecodeError:
        pass
    match = re.search(r"(\{[\s\S]*\}|\[[\s\S]*\])", text)
    if match:
        try:
            return json.loads(match.group(1), strict=False)
        except json.JSONDecodeError:
            # Replace unescaped control chars if still failing
            cleaned_str = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', match.group(1))
            return json.loads(cleaned_str, strict=False)
    raise ValueError("No valid JSON found in response")

async def execute_groq_call(client, model_id: str, messages: list, max_retries: int = 3, initial_delay: float = 2.0):
    """
    Executes a Groq chat completion call with automatic retries on 429 Rate Limit errors.
    """
    delay = initial_delay
    last_exception = None
    for attempt in range(max_retries):
        try:
            response = await asyncio.to_thread(
                client.chat.completions.create,
                model=model_id,
                messages=messages
            )
            return response
        except Exception as e:
            last_exception = e
            err_msg = str(e).lower()
            if "429" in err_msg or "rate limit" in err_msg:
                print(f"[GROQ RATE LIMIT 429] Waiting {delay}s before retry {attempt+1}/{max_retries}...")
                await asyncio.sleep(delay)
                delay *= 1.5
            else:
                raise e
    raise last_exception
