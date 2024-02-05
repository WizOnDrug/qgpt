# views.py
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import requests
import json
from django.http import JsonResponse
import os
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST", "OPTIONS"])
def getchatresponse(request):
    openai_api_key = os.environ.get("OPENAI_API_KEY", "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")

    try:
        data = json.loads(request.body)
        chat_prompt = data.get("prompt", "")

        if not chat_prompt:
            return JsonResponse({"error": "Missing 'prompt' in the request data"}, status=400)

        url = "https://api.openai.com/v1/completions"
        headers = {"Content-Type": "application/json", "Authorization": f"Bearer {openai_api_key}"}
        request_data = {"model": "gpt-3.5-turbo-instruct", "prompt": f"عنوان این سوال را در چند کلمه بدون توضیح ارسال کن{chat_prompt}", "max_tokens": 2000}

        response = requests.post(url, headers=headers, json=request_data)
        response_json = response.json()

        if response.status_code != 200:
            logger.error(f"OpenAI API error: {response_json}")
            return JsonResponse({"error": "Failed to fetch response from OpenAI API"}, status=500)

        return JsonResponse(response_json)

    except (requests.exceptions.RequestException, json.JSONDecodeError) as e:
        logger.error(f"Error interacting with OpenAI API: {str(e)}")
        return JsonResponse({"error": f"Error interacting with OpenAI API: {str(e)}"}, status=500)

    except Exception as e:
        logger.error(f"An unexpected error occurred: {str(e)}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)
