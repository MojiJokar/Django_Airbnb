FROM python:3.12-slim-bookworm

WORKDIR /usr/src/django_bnb_backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]