FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь backend (и app, и create_tables.py, и всё остальное)
COPY . .

# Uvicorn стартует из пакета app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
EXPOSE 8000
