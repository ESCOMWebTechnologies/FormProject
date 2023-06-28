import subprocess
import sys
import tarfile
import os

try:
    from transformers import BertTokenizer, BertModel
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "transformers", "torch"])
    from transformers import BertTokenizer
    import torch

model_archive = "camembert-base.tar.gz"  # Actualiza con la ruta correcta

# Extraer el contenido del archivo tar.gz
model_directory = "camembert-base/"  # Actualiza con la ruta deseada
with tarfile.open(model_archive, "r:gz") as tar:
    tar.extractall(model_directory)

# Ruta del tokenizador de BERT en español
tokenizer_path = os.path.join(model_directory, "vocab.txt")
model = BertModel.from_pretrained(model_directory)

# Carga el tokenizador desde el archivo
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)
input_text = "¿Qué es el color?"
answers = [
    "El color es una percepción visual que nos permite distinguir diferentes tonalidades.",
    "Se refiere a la forma en que la luz interactúa con los objetos y cómo nuestros ojos lo interpretan.",
    "Es una propiedad física de los objetos que determina cómo se refleja o emite la luz.",
]

# Codifica el texto de entrada y las respuestas utilizando el tokenizador de BERT en español
encoded_input = tokenizer.encode_plus(input_text, add_special_tokens=True, return_tensors='pt')
encoded_answers = tokenizer.batch_encode_plus(answers, add_special_tokens=True, return_tensors='pt')

# Obtiene las representaciones de los embeddings de los textos
input_embeddings = model(**encoded_input).last_hidden_state
answer_embeddings = model(**encoded_answers).last_hidden_state

# Calcula la similitud coseno entre el texto de entrada y las respuestas
similarity_scores = torch.nn.functional.cosine_similarity(input_embeddings, answer_embeddings)

# Encuentra la respuesta con la mayor similitud
best_answer_index = similarity_scores.argmax().item()
best_answer = answers[best_answer_index]

# Imprime la mejor respuesta
print("Pregunta: " + input_text)
print("Respuesta: " + best_answer)
