from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import json

router = APIRouter(prefix="/ai", tags=["AI Features"])

class AIContentRequest(BaseModel):
    prompt: str
    content_type: str = "article"  # article, title, summary, etc.
    language: str = "ar"
    max_length: Optional[int] = 500

class AITranslationRequest(BaseModel):
    text: str
    target_language: str = "en"
    source_language: str = "ar"

class AIGrammarCheckRequest(BaseModel):
    text: str
    language: str = "ar"

class AIGrammarCheckResponse(BaseModel):
    original_text: str
    corrected_text: str
    errors: List[dict]
    suggestions: List[str]

@router.post("/generate-content")
async def generate_content(request: AIContentRequest):
    """Generate content using AI"""
    # Mock AI content generation
    mock_content = {
        "article": f"بناءً على طلبك '{request.prompt}'، إليك مقال شامل:\n\n{request.prompt} هو موضوع مهم جداً في عصرنا الحالي. هذا الموضوع له تأثير كبير على حياتنا اليومية...",
        "title": f"دليل شامل حول {request.prompt}",
        "summary": f"ملخص: {request.prompt} هو مفهوم أساسي يتطلب فهماً عميقاً...",
        "outline": f"مخطط المقال:\n1. مقدمة عن {request.prompt}\n2. الأهمية والفوائد\n3. التطبيقات العملية\n4. الخلاصة والتوصيات"
    }
    
    generated_content = mock_content.get(request.content_type, f"محتوى حول {request.prompt}")
    
    return {
        "generated_content": generated_content,
        "content_type": request.content_type,
        "language": request.language,
        "is_ai_generated": True,
        "model_used": "mock-ai-model",
        "tokens_used": len(generated_content.split()),
        "processing_time": 1500  # milliseconds
    }

@router.post("/translate")
async def translate_text(request: AITranslationRequest):
    """Translate text using AI"""
    # Mock translation
    translations = {
        ("ar", "en"): f"Translation of '{request.text}' to English: This is a translated text about the topic.",
        ("en", "ar"): f"ترجمة '{request.text}' إلى العربية: هذا نص مترجم حول الموضوع.",
        ("ar", "fr"): f"Traduction de '{request.text}' en français: Ceci est un texte traduit sur le sujet.",
        ("en", "fr"): f"Traduction de '{request.text}' en français: Ceci est un texte traduit sur le sujet."
    }
    
    key = (request.source_language, request.target_language)
    translated_text = translations.get(key, f"Translated: {request.text}")
    
    return {
        "original_text": request.text,
        "translated_text": translated_text,
        "source_language": request.source_language,
        "target_language": request.target_language,
        "confidence": 0.95,
        "is_ai_generated": True,
        "model_used": "mock-translation-model",
        "processing_time": 800
    }

@router.post("/grammar-check", response_model=AIGrammarCheckResponse)
async def check_grammar(request: AIGrammarCheckRequest):
    """Check grammar and spelling"""
    # Mock grammar check
    corrected_text = request.text.replace("الذكاء الاصطناعي", "الذكاء الاصطناعي")  # Mock correction
    
    return AIGrammarCheckResponse(
        original_text=request.text,
        corrected_text=corrected_text,
        errors=[
            {
                "type": "spelling",
                "position": 10,
                "suggestion": "الذكاء الاصطناعي",
                "confidence": 0.9
            }
        ],
        suggestions=[
            "تأكد من استخدام علامات الترقيم بشكل صحيح",
            "استخدم مصطلحات أكثر دقة في هذا السياق"
        ]
    )

@router.post("/generate-image")
async def generate_image(request: dict):
    """Generate image using AI"""
    # Mock image generation
    return {
        "image_url": "https://via.placeholder.com/800x600/667eea/ffffff?text=AI+Generated+Image",
        "prompt": request.get("prompt", "AI generated image"),
        "style": request.get("style", "realistic"),
        "size": request.get("size", "800x600"),
        "is_ai_generated": True,
        "model_used": "mock-image-model",
        "processing_time": 5000
    }

@router.post("/speech-to-text")
async def speech_to_text(request: dict):
    """Convert speech to text"""
    # Mock speech to text
    return {
        "transcript": "هذا نص محول من الصوت إلى النص باستخدام الذكاء الاصطناعي",
        "confidence": 0.92,
        "language": "ar",
        "duration": request.get("duration", 30),  # seconds
        "is_ai_generated": True,
        "model_used": "mock-speech-model",
        "processing_time": 2000
    }

@router.post("/text-to-speech")
async def text_to_speech(request: dict):
    """Convert text to speech"""
    # Mock text to speech
    return {
        "audio_url": "https://example.com/generated-audio.mp3",
        "text": request.get("text", "نص للتحويل إلى صوت"),
        "voice": request.get("voice", "arabic-female"),
        "language": "ar",
        "duration": 15,  # seconds
        "is_ai_generated": True,
        "model_used": "mock-tts-model",
        "processing_time": 3000
    }

@router.get("/suggestions")
async def get_ai_suggestions(
    content_type: str = "article",
    category: Optional[str] = None
):
    """Get AI-powered content suggestions"""
    # Mock suggestions
    suggestions = {
        "article": [
            "كيف يؤثر الذكاء الاصطناعي على مستقبل العمل؟",
            "أفضل الممارسات في تطوير تطبيقات الويب الحديثة",
            "دليل شامل لتعلم البرمجة للمبتدئين",
            "مستقبل التكنولوجيا في 2024"
        ],
        "title": [
            "10 نصائح لتحسين أداء موقعك الإلكتروني",
            "الذكاء الاصطناعي: الثورة القادمة",
            "أساسيات الأمان السيبراني",
            "كيف تبدأ مشروعك التقني الأول؟"
        ],
        "tag": [
            "ذكاء اصطناعي",
            "تطوير ويب",
            "أمان معلومات",
            "ريادة أعمال",
            "تكنولوجيا"
        ]
    }
    
    return {
        "suggestions": suggestions.get(content_type, []),
        "content_type": content_type,
        "category": category,
        "is_ai_generated": True,
        "model_used": "mock-suggestion-model"
    }

@router.get("/analytics")
async def get_ai_analytics():
    """Get AI usage analytics"""
    # Mock analytics
    return {
        "total_ai_requests": 1250,
        "content_generation_requests": 450,
        "translation_requests": 300,
        "grammar_check_requests": 200,
        "image_generation_requests": 150,
        "speech_requests": 100,
        "text_to_speech_requests": 50,
        "total_tokens_used": 50000,
        "total_cost": 25.50,
        "most_used_feature": "content_generation",
        "average_processing_time": 2000,  # milliseconds
        "success_rate": 0.98
    }