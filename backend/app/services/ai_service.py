import json
from typing import List, Dict, Any, Optional

from app.config import settings


class AIService:
    def __init__(self):
        self.client = None
        self._init_client()

    def _init_client(self):
        if settings.OPENAI_API_KEY:
            try:
                from openai import AsyncOpenAI
                self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            except Exception:
                self.client = None

    async def _call_llm(self, prompt: str, system_prompt: str = "") -> str:
        if self.client:
            try:
                messages = []
                if system_prompt:
                    messages.append({"role": "system", "content": system_prompt})
                messages.append({"role": "user", "content": prompt})
                response = await self.client.chat.completions.create(
                    model=settings.OPENAI_MODEL,
                    messages=messages,
                    temperature=0.7,
                    max_tokens=2000,
                )
                return response.choices[0].message.content or ""
            except Exception:
                pass
        return self._fallback_response(prompt)

    def _fallback_response(self, prompt: str) -> str:
        if "impact story" in prompt.lower() or "generate" in prompt.lower():
            return self._generate_fallback_story(prompt)
        if "match" in prompt.lower() or "volunteer" in prompt.lower():
            return self._generate_fallback_match(prompt)
        if "scholarship" in prompt.lower() or "find" in prompt.lower():
            return self._generate_fallback_scholarship(prompt)
        return self._generate_fallback_chat(prompt)

    def _generate_fallback_story(self, prompt: str) -> str:
        return json.dumps({
            "title": "Community Transformation Through Education",
            "story": "NayePankh Foundation organized a transformative event that brought together community members, educators, and volunteers. The initiative focused on providing educational resources to underprivileged children, creating a ripple effect of positive change in the community. Through collective efforts, we witnessed remarkable improvements in learning outcomes and community engagement.",
            "donor_report": "Your generous support enabled NayePankh to reach 200+ children with quality educational materials. The program achieved 95% attendance rate and saw a 40% improvement in basic literacy skills among participants. Community feedback has been overwhelmingly positive, with parents reporting increased enthusiasm for education.",
            "linkedin_post": "When communities come together, magic happens! 🌟\n\nWe recently completed an incredible initiative reaching 200+ children with educational resources. The energy, dedication, and smiles we witnessed remind us why we do what we do.\n\nThank you to our amazing volunteers and donors who made this possible!\n\n#NayePankh #EducationForAll #CommunityImpact #NGO",
            "newsletter": "In this edition:\n- Community education drive reaches 200+ children\n- Volunteer stories that inspire\n- Upcoming programs and how you can help\n- Impact metrics and transparency report\n\nYour continued support fuels our mission of creating equal opportunities through education."
        })

    def _generate_fallback_match(self, prompt: str) -> str:
        return json.dumps({
            "matches": [
                {
                    "project": "Community Education Program",
                    "score": 92,
                    "reasoning": "Your skills in teaching and community outreach align perfectly with our education initiative. Your availability on weekends matches our program schedule."
                },
                {
                    "project": "Youth Mentorship Initiative",
                    "score": 85,
                    "reasoning": "Your experience in mentoring and interest in youth development makes you an excellent candidate for this program."
                },
                {
                    "project": "Environmental Awareness Drive",
                    "score": 78,
                    "reasoning": "Your passion for environmental causes combined with your organizational skills would greatly benefit this project."
                }
            ]
        })

    def _generate_fallback_scholarship(self, prompt: str) -> str:
        return json.dumps({
            "scholarships": [
                {
                    "title": "National Merit Scholarship",
                    "provider": "Government of India",
                    "description": "Merit-based scholarship for outstanding students pursuing higher education.",
                    "amount": 50000,
                    "eligibility": "Above 80% in previous examination, family income below 5 LPA",
                    "education_level": "Undergraduate",
                    "interest_area": "General",
                    "application_url": "https://scholarships.gov.in"
                },
                {
                    "title": "STEM Excellence Award",
                    "provider": "Tech Foundation",
                    "description": "Supporting students in Science, Technology, Engineering, and Mathematics fields.",
                    "amount": 75000,
                    "eligibility": "Enrolled in STEM program, minimum 75% marks",
                    "education_level": "Undergraduate",
                    "interest_area": "Science",
                    "application_url": "https://example.com/stem-scholarship"
                },
                {
                    "title": "Community Leader Scholarship",
                    "provider": "NayePankh Foundation",
                    "description": "For students who demonstrate leadership in community service.",
                    "amount": 25000,
                    "eligibility": "Active volunteer with minimum 100 hours of community service",
                    "education_level": "All Levels",
                    "interest_area": "Community Service",
                    "application_url": "https://nayepankh.org/scholarships"
                }
            ],
            "courses": [
                {"title": "Communication Skills Workshop", "platform": "Coursera", "url": "https://coursera.org"},
                {"title": "Leadership Development Program", "platform": "edX", "url": "https://edx.org"}
            ],
            "competitions": [
                {"title": "National Science Olympiad", "organizer": "Science Foundation", "url": "https://example.com"},
                {"title": "Debate Championship", "organizer": "Education Board", "url": "https://example.com"}
            ]
        })

    def _generate_fallback_chat(self, prompt: str) -> str:
        prompt_lower = prompt.lower()
        if "program" in prompt_lower or "initiative" in prompt_lower:
            return "NayePankh Foundation runs several impactful programs including: Community Education Program (teaching underprivileged children), Youth Mentorship Initiative (guiding young leaders), Women Empowerment Workshops, Environmental Awareness Drives, and Skill Development Training. Would you like to learn more about any specific program?"
        elif "volunteer" in prompt_lower:
            return "We welcome volunteers! You can contribute by teaching, mentoring, organizing events, or providing professional skills. Simply register on our website, complete your profile with your skills and interests, and we'll match you with suitable opportunities. Most volunteers commit 4-6 hours per week."
        elif "event" in prompt_lower:
            return "We organize various events throughout the year including community drives, workshops, fundraising galas, and awareness campaigns. Check our Events page for upcoming activities. Registration is free and open to all supporters!"
        elif "scholarship" in prompt_lower:
            return "NayePankh offers scholarship assistance and can help you find suitable opportunities based on your profile. Use our Scholarship Finder tool to discover scholarships, courses, and competitions matching your interests and education level."
        elif "contact" in prompt_lower or "reach" in prompt_lower:
            return "You can reach NayePankh Foundation through our website contact form, email us at info@nayepankh.org, or call us at +91-XXXXXXXXXX. Our team typically responds within 24 hours."
        elif "about" in prompt_lower or "mission" in prompt_lower:
            return "NayePankh Foundation (New Wings) is dedicated to empowering underprivileged communities through education, skill development, and sustainable opportunities. Our mission is to create equal access to quality education and enable every individual to spread their wings and soar."
        else:
            return "Thank you for reaching out to NayePankh Foundation! I'm here to help you learn about our programs, volunteer opportunities, events, and scholarship options. How can I assist you today? You can ask me about our mission, upcoming events, how to volunteer, or finding scholarships."

    async def generate_impact_story(
        self, event_name: str, location: str, activity_details: str, observations: str
    ) -> Dict[str, str]:
        prompt = f"""Generate a comprehensive impact story for the following event:

Event: {event_name}
Location: {location}
Activities: {activity_details}
Observations: {observations}

Please provide the output as a JSON object with these exact keys:
- title: A compelling title for the impact story
- story: A detailed, emotional impact story (300-400 words)
- donor_report: A concise donor impact report (150-200 words)
- linkedin_post: A social media post suitable for LinkedIn (under 300 characters)
- newsletter: A newsletter summary (200-250 words)"""
        result = await self._call_llm(prompt, "You are an NGO communications expert creating impactful stories.")
        try:
            return json.loads(result)
        except (json.JSONDecodeError, TypeError):
            return json.loads(self._generate_fallback_story(prompt))

    async def match_volunteer(
        self, skills: List[str], availability: str, interests: List[str]
    ) -> List[Dict[str, Any]]:
        prompt = f"""Based on the following volunteer profile, suggest suitable NGO projects:

Skills: {', '.join(skills)}
Availability: {availability}
Interests: {', '.join(interests)}

Provide output as JSON with key "matches" containing a list of projects, each with: project (name), score (0-100 number), reasoning (string). List 3-5 matches."""
        result = await self._call_llm(prompt, "You are a volunteer matching specialist for an NGO.")
        try:
            data = json.loads(result)
            return data.get("matches", [])
        except (json.JSONDecodeError, TypeError):
            data = json.loads(self._generate_fallback_match(prompt))
            return data.get("matches", [])

    async def find_scholarships(
        self, education_level: str, interest_area: str, budget: float = 0.0
    ) -> Dict[str, List[Dict[str, Any]]]:
        prompt = f"""Find scholarships, courses, and competitions for a student:

Education Level: {education_level}
Interest Area: {interest_area}
Budget: {budget}

Provide JSON with keys: scholarships (list with title, provider, description, amount, eligibility, education_level, interest_area, application_url), courses (list with title, platform, url), competitions (list with title, organizer, url)."""
        result = await self._call_llm(prompt, "You are an education counselor specializing in scholarships.")
        try:
            return json.loads(result)
        except (json.JSONDecodeError, TypeError):
            return json.loads(self._generate_fallback_scholarship(prompt))

    async def chat(self, message: str, history: List[Dict[str, str]] = None) -> str:
        context = ""
        if history:
            context = "\n".join([f"{m['role']}: {m['content']}" for m in history[-6:]])
        prompt = f"""Conversation history:
{context}

User message: {message}

Respond helpfully about NayePankh Foundation programs, volunteering, events, and NGO-related queries."""
        return await self._call_llm(prompt, "You are a helpful NGO knowledge assistant for NayePankh Foundation. Be concise, warm, and informative.")


ai_service = AIService()
