"""Seed the database with sample data."""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.volunteer import Volunteer
from app.models.project import Project
from app.models.event import Event
from app.models.scholarship import Scholarship
from app.middleware.auth import get_password_hash

Base.metadata.create_all(bind=engine)
db = SessionLocal()

try:
    if not db.query(User).first():
        admin = User(
            email="admin@nayepankh.org",
            username="admin",
            full_name="NayePankh Admin",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
        )
        db.add(admin)
        db.commit()

    if not db.query(Project).first():
        projects = [
            Project(
                title="Community Education Program",
                slug="community-education-program",
                description="Providing quality education to underprivileged children in rural communities. Our program focuses on basic literacy, numeracy, and life skills.",
                category="Education",
                location="Multiple Locations",
                impact="500+ children educated annually",
                volunteers_needed=50,
                skills_required=["Teaching", "Mentoring", "Communication"],
                is_active=True,
            ),
            Project(
                title="Youth Mentorship Initiative",
                slug="youth-mentorship-initiative",
                description="Empowering young leaders through mentorship, career guidance, and skill development workshops.",
                category="Youth Development",
                location="Urban Centers",
                impact="200+ youth mentored",
                volunteers_needed=30,
                skills_required=["Mentoring", "Leadership", "Counseling"],
                is_active=True,
            ),
            Project(
                title="Women Empowerment Workshop",
                slug="women-empowerment-workshop",
                description="Conducting workshops on financial literacy, entrepreneurship, and vocational training for women.",
                category="Women Empowerment",
                location="Community Centers",
                impact="300+ women empowered",
                volunteers_needed=25,
                skills_required=["Training", "Business", "Communication"],
                is_active=True,
            ),
            Project(
                title="Environmental Awareness Drive",
                slug="environmental-awareness-drive",
                description="Promoting environmental conservation through tree planting, waste management, and awareness campaigns.",
                category="Environment",
                location="Schools & Communities",
                impact="10000+ trees planted",
                volunteers_needed=40,
                skills_required=["Organization", "Public Speaking", "Field Work"],
                is_active=True,
            ),
            Project(
                title="Skill Development Program",
                slug="skill-development-program",
                description="Vocational training and skill development for unemployed youth to enhance employability.",
                category="Skill Development",
                location="Training Centers",
                impact="150+ youth employed",
                volunteers_needed=20,
                skills_required=["Training", "Industry Knowledge", "Mentoring"],
                is_active=True,
            ),
        ]
        db.add_all(projects)
        db.commit()

    if not db.query(Event).first():
        now = datetime.now()
        events = [
            Event(
                title="Annual Education Fair 2024",
                slug="annual-education-fair-2024",
                description="A grand education fair showcasing our programs, success stories, and future initiatives. Meet our team and learn how you can contribute.",
                location="Delhi NCR Convention Center",
                event_date=now + timedelta(days=30),
                category="Education",
                organizer="NayePankh Foundation",
                max_participants=500,
                image_url="",
            ),
            Event(
                title="Community Clean-up Drive",
                slug="community-clean-up-drive",
                description="Join us for a community-wide clean-up initiative. Together, we can make our neighborhoods cleaner and greener.",
                location="Multiple Locations",
                event_date=now + timedelta(days=15),
                category="Environment",
                organizer="Green Warriors Team",
                max_participants=200,
                image_url="",
            ),
            Event(
                title="Youth Leadership Summit",
                slug="youth-leadership-summit",
                description="A day-long summit featuring inspiring talks, workshops, and networking opportunities for young leaders.",
                location="City Auditorium",
                event_date=now + timedelta(days=45),
                category="Youth Development",
                organizer="Youth Council",
                max_participants=300,
                image_url="",
            ),
            Event(
                title="Fundraising Gala 2024",
                slug="fundraising-gala-2024",
                description="An evening of inspiration, entertainment, and community building to raise funds for our educational programs.",
                location="Grand Ballroom",
                event_date=now + timedelta(days=60),
                category="Fundraising",
                organizer="NayePankh Foundation",
                max_participants=400,
                image_url="",
            ),
            Event(
                title="Health & Wellness Camp",
                slug="health-wellness-camp",
                description="Free health check-ups, awareness sessions, and wellness activities for underprivileged communities.",
                location="Community Health Center",
                event_date=now + timedelta(days=20),
                category="Health",
                organizer="Health Partners",
                max_participants=250,
                image_url="",
            ),
        ]
        db.add_all(events)
        db.commit()

    if not db.query(Scholarship).first():
        scholarships = [
            Scholarship(
                title="National Merit Scholarship",
                provider="Government of India",
                description="Merit-based scholarship for outstanding students pursuing higher education in any field.",
                amount=50000.0,
                eligibility="Above 80% in previous examination, family income below 5 LPA",
                education_level="Undergraduate",
                interest_area="General",
                application_url="https://scholarships.gov.in",
                deadline=datetime(now.year + 1, 3, 31),
                is_active=True,
            ),
            Scholarship(
                title="STEM Excellence Award",
                provider="Tech Foundation India",
                description="Supporting students pursuing careers in Science, Technology, Engineering, and Mathematics.",
                amount=75000.0,
                eligibility="Enrolled in STEM program, minimum 75% marks, family income below 8 LPA",
                education_level="Undergraduate",
                interest_area="Science",
                application_url="https://example.com/stem",
                deadline=datetime(now.year + 1, 4, 15),
                is_active=True,
            ),
            Scholarship(
                title="Community Leader Scholarship",
                provider="NayePankh Foundation",
                description="For students who demonstrate exceptional leadership in community service and social work.",
                amount=25000.0,
                eligibility="Active volunteer with minimum 100 hours of community service, pursuing any degree",
                education_level="All Levels",
                interest_area="Community Service",
                application_url="https://nayepankh.org/scholarships",
                deadline=datetime(now.year + 1, 5, 1),
                is_active=True,
            ),
            Scholarship(
                title="Women in Technology Grant",
                provider="Women Tech Foundation",
                description="Encouraging women to pursue careers in technology and engineering fields.",
                amount=100000.0,
                eligibility="Female students enrolled in technology/engineering programs, minimum 70% marks",
                education_level="Undergraduate",
                interest_area="Technology",
                application_url="https://example.com/women-tech",
                deadline=datetime(now.year + 1, 6, 30),
                is_active=True,
            ),
            Scholarship(
                title="Sports Excellence Scholarship",
                provider="National Sports Board",
                description="Supporting student-athletes who excel in both academics and sports.",
                amount=40000.0,
                eligibility="Represented at state/national level in sports, minimum 60% in academics",
                education_level="Undergraduate",
                interest_area="Sports",
                application_url="https://example.com/sports",
                deadline=datetime(now.year + 1, 3, 15),
                is_active=True,
            ),
        ]
        db.add_all(scholarships)
        db.commit()

    print("Database seeded successfully!")
except Exception as e:
    print(f"Error seeding database: {e}")
    db.rollback()
finally:
    db.close()
