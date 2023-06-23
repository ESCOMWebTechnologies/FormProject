import spacy

nlp = spacy.load('es_core_news_sm')

# Definir la pregunta y las respuestas
pregunta = "¿Cuál es la capital de Francia?"
respuestas = [
    "La capital de Francia es París.",
    "París es la capital de Francia.",
    "La capital de Francia se llama París.",
]

# Generar el contexto utilizando la pregunta y las respuestas
contexto = pregunta + " " + " ".join(respuestas)

# Procesar el contexto con Spacy
doc = nlp(contexto)

# Obtener la última respuesta como nueva respuesta
nueva_respuesta = "Nerlon es su capi."

# Procesar la nueva respuesta con Spacy
nuevo_doc = nlp(nueva_respuesta)

# Calcular la similitud entre la nueva respuesta y el contexto existente
similitudes = [nuevo_doc.similarity(doc[i]) for i in range(1, len(doc))]

# Imprimir las similitudes
print(max(similitudes))