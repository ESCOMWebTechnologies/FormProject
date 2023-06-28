import subprocess
import sys
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import pip
try:
    print("Importing tensorflow...")
    import tensorflow as tf
    from tensorflow import keras
    print("Importing tokenizer...")
    from keras.preprocessing.text import Tokenizer
    print("Importing pad_sequence...")
    from tensorflow.keras.preprocessing.sequence import pad_sequences
    print("Importing numpy...")
    import numpy as np
    print("Importing matplot...")
    import matplotlib
    print("Importing mysql...")
    import mysql.connector
except ImportError:
    print("Error importing...\nDownloading the libraries")
    pip.main(["install","tensorflow","mysql-connector-python","torch","numpy","matplotlib"])
    subprocess.check_call([sys.executable, "-m", "pip", "install", "tensorflow", "torch", "numpy", "matplotlib", "mysql-connector-python"])
    print("Importing tensorflow...")
    import tensorflow as tf
    from tensorflow import keras
    print("Importing tokenizer...")
    from keras.preprocessing.text import Tokenizer
    print("Importing pad_sequence...")
    from tensorflow.keras.preprocessing.sequence import pad_sequences
    print("Importing numpy...")
    import numpy as np
    print("Importing matplot...")
    import matplotlib
    print("Importing mysql...")
    import mysql.connector
try:
    db = mysql.connector.connect(host="localhost", user="admin", password="1234", database="formProject")
except:
    pass
print("Loading data")
sentences = [
    "El color es una propiedad visual que percibimos a través de la luz.",
    "La visión del color es un fenómeno complejo que involucra la interacción de la luz con nuestros ojos y cerebro.",
    "El color es una característica de los objetos que nos permite diferenciarlos visualmente.",
    "Los colores primarios son aquellos que no se pueden obtener mediante la mezcla de otros colores.",
    "El color es una herramienta utilizada en el diseño gráfico para crear composiciones visuales atractivas.",
    "La teoría del color se basa en la relación entre los colores primarios, secundarios y terciarios.",
    "El color es una propiedad que nos permite identificar y reconocer objetos en función de su apariencia visual.",
    "Los colores terciarios son aquellos que se obtienen mediante la mezcla de un color primario con un color secundario.",
    "El color es una forma de belleza visual que puede ser apreciada y disfrutada estéticamente.",
    "El color es una herramienta utilizada en la moda para transmitir estilos, tendencias y personalidad.",
    "Los colores pastel suelen evocar suavidad y delicadeza, mientras que los colores vibrantes transmiten energía y dinamismo.",
    "El color es una propiedad que nos permite distinguir y clasificar objetos según su apariencia visual.",
    "La teoría del color se basa en la relación entre los colores primarios, secundarios y terciarios.",
    "El color es una propiedad que puede ser representada mediante modelos de color como RGB (rojo, verde, azul) o CMYK (cian, magenta, amarillo, negro).",
    "Los colores tierra, como el marrón y el beige, suelen asociarse con la naturaleza y la calidez.",
    "El color es una herramienta utilizada en la publicidad para llamar la atención y despertar el interés del público.",
    "La sinestesia es un fenómeno en el que se produce una mezcla entre la percepción de colores y otros sentidos, como el sonido o el gusto.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en un entorno visualmente complejo.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, estados de ánimo y comportamiento.",
    "El color es una característica que nos permite interpretar y comprender el mundo que nos rodea a través de la vista.",
    "La rueda de colores es una representación visual de los colores y su relación entre sí.",
    "El color es una forma de expresión personal que puede reflejar nuestra identidad y preferencias.",
    "La luz blanca se compone de todos los colores del espectro visible, y podemos descomponerla en diferentes colores mediante un prisma.",
    "El color es una herramienta utilizada en el diseño de logotipos y marcas para transmitir valores y generar reconocimiento.",
    "La cromoterapia es una práctica que utiliza los colores con fines terapéuticos y de bienestar.",
    "El color es una propiedad que nos permite interpretar la forma y el volumen de los objetos en el espacio.",
    "Los colores fríos, como el azul y el verde, suelen transmitir sensaciones de calma y tranquilidad.",
    "El color es una herramienta utilizada en el cine y la fotografía para crear atmósferas y transmitir emociones.",
    "La cultura y el contexto social pueden influir en la percepción y significado de los colores.",
    "El color es una propiedad visual que puede ser cuantificada y representada mediante valores numéricos, como los componentes RGB.",
    "Los colores cálidos, como el rojo y el amarillo, suelen evocar sensaciones de calidez y energía.",
    "El color es una herramienta utilizada en el diseño de interiores para crear ambientes y transmitir sensaciones.",
    "La acromatopsia es una condición en la que una persona no puede percibir colores debido a un defecto en los fotorreceptores del ojo.",
    "El color es una propiedad que nos permite distinguir y separar objetos en función de su apariencia visual.",
    "El arte del color se refiere al estudio y la aplicación creativa de los colores en la pintura y otras formas de expresión artística.",
    "Los colores neutros, como el blanco, el negro y el gris, suelen transmitir una sensación de neutralidad y equilibrio.",
    "El color es una herramienta utilizada en el diseño de moda para crear combinaciones armoniosas y atractivas.",
    "La percepción del color puede verse afectada por ilusiones ópticas y fenómenos visuales.",
    "El color es una propiedad visual que nos permite identificar objetos y relacionarlos con nuestras experiencias y conocimientos previos.",
    "Los colores brillantes y llamativos suelen atraer la atención y generar impacto visual en el diseño gráfico y la publicidad.",
    "El color es una herramienta utilizada en el diseño de carteles y letreros para transmitir información de manera efectiva.",
    "La tricromacia es el tipo más común de visión del color, en la que los fotorreceptores en nuestros ojos pueden detectar tres colores primarios: rojo, verde y azul.",
    "El color es una propiedad que nos permite diferenciar y reconocer objetos en función de su apariencia visual y su posición en el espacio.",
    "Los colores complementarios, como el rojo y el verde, suelen crear un contraste visual fuerte y se utilizan con frecuencia en el diseño gráfico.",
    "El color es una herramienta utilizada en el diseño de sitios web para mejorar la usabilidad y la experiencia del usuario.",
    "La daltonismo es una condición en la que una persona tiene dificultades para percibir ciertos colores debido a la falta o anomalía de los conos en los ojos.",
    "El color es una propiedad que nos permite distinguir y recordar objetos en función de su apariencia visual.",
    "Los colores fluorescentes, como el amarillo y el naranja brillante, suelen utilizarse para captar la atención y generar impacto visual en el diseño.",
    "El color es una herramienta utilizada en el diseño de productos para transmitir información sobre su uso, funcionalidad y estilo.",
    "Los colores patrióticos, como el rojo, blanco y azul en la bandera de muchos países, suelen evocar sentimientos de patriotismo y pertenencia.",
    "El color es una propiedad visual que nos permite distinguir y clasificar objetos en función de su apariencia y características.",
    "El color es una herramienta utilizada en el diseño de juegos y aplicaciones móviles para mejorar la experiencia del usuario y la jugabilidad.",
    "La visión del color es un proceso que implica la interacción de la luz con los fotorreceptores en nuestros ojos y la interpretación de estas señales por parte del cerebro.",
    "El color es una característica que nos permite identificar y diferenciar objetos en función de su apariencia visual y su relación con el entorno.",
    "Los colores vivos y saturados suelen transmitir una sensación de alegría y vitalidad, y se utilizan con frecuencia en diseños festivos y celebraciones.",
    "El color es una herramienta utilizada en la señalización de seguridad para indicar peligro, advertencia o información importante.",
    "La discromatopsia es una condición en la que una persona tiene dificultades para percibir ciertos colores debido a una alteración en los conos de los ojos.",
    "El color es una propiedad visual que puede ser descrita y categorizada mediante términos como tono, saturación y brillo.",
    "Los colores fríos, como el azul y el verde, suelen transmitir una sensación de calma y serenidad, y se utilizan con frecuencia en espacios de relajación.",
    "El color es una herramienta utilizada en el diseño de presentaciones y materiales visuales para captar la atención y transmitir información de manera efectiva.",
    "La sinestesia es un fenómeno en el que se produce una conexión inusual entre la percepción de colores y otras experiencias sensoriales, como el sabor o el tacto.",
    "El color es una propiedad que nos permite interpretar y comprender la forma, textura y calidad de los objetos a través de la vista.",
    "Los colores pastel, como el rosa suave y el celeste, suelen evocar una sensación de dulzura y delicadeza, y se utilizan con frecuencia en diseños románticos y tiernos.",
    "El color es una herramienta utilizada en el diseño de interfaces de usuario para mejorar la legibilidad, la usabilidad y la accesibilidad de aplicaciones y sitios web.",
    "La cromatografía es una técnica científica que utiliza la separación de colores para analizar y identificar compuestos químicos en una muestra.",
    "El color es una propiedad visual que puede ser interpretada de manera subjetiva y puede variar según las preferencias y experiencias individuales.",
    "Los colores llamativos y contrastantes suelen ser utilizados en el diseño de señales de tráfico para mejorar la visibilidad y la comprensión rápida de la información.",
    "El color es una herramienta utilizada en la fotografía para transmitir emociones, crear atmósferas y contar historias visualmente.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y las interpretan como diferentes colores.",
    "El color es una propiedad que nos permite establecer relaciones visuales y jerarquías entre elementos en una composición, destacando algunos y fusionando otros.",
    "Los colores pastel suelen transmitir una sensación de suavidad y calma, y se utilizan con frecuencia en diseños delicados y dulces.",
    "El color es una herramienta utilizada en el diseño de packaging para atraer y seducir a los consumidores, y comunicar la personalidad y valores de la marca.",
    "La teoría del color se basa en la idea de que los colores pueden mezclarse y combinarse para crear una amplia gama de tonalidades y matices.",
    "El color es una propiedad visual que nos permite percibir y diferenciar los objetos en función de la forma en que interactúan con la luz.",
    "Los colores vivos y saturados, como el amarillo brillante y el fucsia, suelen transmitir una sensación de alegría y entusiasmo, y se utilizan en diseños festivos y llamativos.",
    "El color es una herramienta utilizada en el diseño de carteles y anuncios publicitarios para captar la atención y despertar el interés del público.",
    "La protanopia es una forma de daltonismo en la que una persona tiene dificultades para percibir el color rojo debido a la ausencia o defecto de los conos responsables de detectar el rojo en los ojos.",
    "El color es una propiedad visual que nos permite identificar y diferenciar objetos en función de su apariencia y su relación con otros elementos en la escena.",
    "Los colores naturales, como el verde de los árboles y el azul del cielo, suelen transmitir una sensación de armonía y conexión con la naturaleza.",
    "El color es una herramienta utilizada en la impresión y reproducción de imágenes para obtener una representación fiel y vibrante de los colores originales.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, comportamiento y percepciones.",
    "El color es una propiedad que nos permite identificar y clasificar objetos en función de su apariencia visual y sus características únicas.",
    "Los colores claros y suaves, como el blanco y el beige, suelen transmitir una sensación de pureza y tranquilidad, y se utilizan en diseños minimalistas y elegantes.",
    "El color es una herramienta utilizada en el diseño de logotipos y marcas para transmitir la personalidad y los valores de una empresa o producto.",
    "La acromatopsia es una condición en la que una persona no puede percibir colores debido a la falta o mal funcionamiento de los conos en los ojos, y ve el mundo en blanco y negro.",
    "El color es una propiedad visual que nos permite identificar y reconocer objetos en función de su apariencia y su relación con el entorno.",
    "Los colores brillantes y saturados suelen transmitir una sensación de energía y vitalidad, y se utilizan en diseños que buscan captar la atención y generar impacto visual.",
    "El color es una herramienta utilizada en el diseño de empaques y etiquetas de productos para atraer a los consumidores, comunicar información importante y destacarse en los estantes de las tiendas.",
    "Los colores suaves y neutros, como el gris y el beige, suelen transmitir una sensación de elegancia y sofisticación, y se utilizan en diseños minimalistas y contemporáneos.",
    "El color es una propiedad visual que nos permite distinguir y diferenciar objetos en función de su apariencia y características físicas.",
    "La teoría del color se basa en la idea de que los colores pueden clasificarse en categorías primarias, secundarias y terciarias, y que pueden mezclarse y combinarse para obtener nuevas tonalidades.",
    "El color es una herramienta utilizada en la señalización de emergencia para indicar rutas de evacuación, equipos de seguridad y peligros potenciales.",
    "La discromatopsia es una condición en la que una persona tiene dificultades para percibir ciertos colores debido a una alteración en los fotorreceptores de los ojos o en las vías visuales del cerebro.",
    "El color es una propiedad visual que nos permite interpretar y comprender el mundo que nos rodea, y nos brinda información sobre la identidad, estado y ubicación de los objetos.",
    "Los colores oscuros y profundos, como el negro y el morado, suelen transmitir una sensación de misterio y elegancia, y se utilizan en diseños sofisticados y lujosos.",
    "El color es una herramienta utilizada en el diseño de sitios web y aplicaciones móviles para crear interfaces atractivas, accesibles y fáciles de usar.",
    "La tetracromacia es una condición en la que una persona tiene un cuarto tipo de cono en los ojos, lo que le permite percibir un espectro más amplio de colores que la mayoría de las personas.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su significado cultural o simbólico.",
    "Los colores metálicos, como el dorado y el plateado, suelen transmitir una sensación de lujo y sofisticación, y se utilizan en diseños elegantes y glamorosos.",
    "El color es una herramienta utilizada en la psicología y terapia del color para influir en el estado de ánimo, reducir el estrés y promover el bienestar emocional.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite distinguir y clasificar objetos en función de su apariencia y características estéticas.",
    "Los colores tierra, como el marrón y el verde oliva, suelen transmitir una sensación de naturalidad y conexión con la tierra, y se utilizan en diseños rústicos y orgánicos.",
    "El color es una herramienta utilizada en el diseño de carteles y volantes publicitarios para captar la atención de las personas y comunicar mensajes de manera efectiva.",
    "La visión del color es un proceso complejo que involucra la interacción de la luz con los fotorreceptores en nuestros ojos, la transmisión de señales al cerebro y la interpretación de esas señales como colores.",
    "El color es una propiedad que nos permite interpretar y comprender la forma, textura y materialidad de los objetos a través de la vista.",
    "Los colores complementarios, como el azul y el naranja, suelen crear un contraste fuerte y vibrante, y se utilizan en diseños que buscan captar la atención y destacar visualmente.",
    "El color es una herramienta utilizada en la publicidad y el marketing para influir en las decisiones de compra, evocar emociones y comunicar los valores de una marca o producto.",
    "La daltonismo es una condición en la que una persona tiene dificultades para diferenciar ciertos colores debido a la ausencia o mal funcionamiento de los conos en los ojos.",
    "El color es una propiedad visual que nos permite distinguir y reconocer objetos en función de su apariencia y su relación con el espacio y el entorno.",
    "Los colores brillantes y llamativos, como el amarillo brillante y el verde lima, suelen transmitir una sensación de energía y alegría, y se utilizan en diseños festivos y de celebración.",
    "El color es una herramienta utilizada en el diseño de productos y envases para transmitir información sobre su uso, características y estilo de vida asociado.",
    "Los colores patrióticos, como el rojo, blanco y azul en la bandera de muchos países, suelen evocar sentimientos de orgullo, lealtad y pertenencia nacional.",
    "El color es una propiedad que nos permite distinguir y recordar objetos en función de su apariencia visual y su relación con otros elementos en el entorno.",
    "El color es una herramienta utilizada en el diseño de interfaces de usuario para mejorar la legibilidad, jerarquía visual y usabilidad de aplicaciones y sitios web.",
    "La cromoterapia es una práctica terapéutica que utiliza colores para promover el equilibrio y el bienestar físico, emocional y espiritual.",
    "El color es una propiedad visual que puede ser interpretada de manera subjetiva y puede evocar diferentes respuestas y significados según el contexto cultural y personal.",
    "Los colores llamativos y contrastantes suelen utilizarse en el diseño de señales de tráfico y advertencia para llamar la atención y transmitir información de manera rápida y efectiva.",
    "El color es una herramienta utilizada en la fotografía y el cine para crear ambientes, transmitir emociones y contar historias a través de la paleta de colores.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y los interpretan como diferentes colores.",
    "El color es una propiedad que nos permite establecer relaciones visuales y jerarquías entre elementos en una composición, enfatizando unos y atenuando otros.",
    "Los colores pastel, como el rosa suave y el lavanda, suelen transmitir una sensación de suavidad y delicadeza, y se utilizan en diseños románticos y soñadores.",
    "El color es una herramienta utilizada en el diseño de productos y embalajes para transmitir la identidad de la marca, comunicar los valores y atraer a los consumidores.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, percepciones y comportamientos, y se aplica en campos como el marketing, el diseño y la terapia.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su relación con el contexto cultural y simbólico.",
    "Los colores claros y suaves, como el blanco y el tono pastel, suelen transmitir una sensación de pureza y serenidad, y se utilizan en diseños minimalistas y elegantes.",
    "El color es una herramienta utilizada en el diseño de logotipos y marcas para crear una identidad visual distintiva, atraer la atención y transmitir los valores de la empresa o producto.",
    "La acromatopsia es una condición en la que una persona no puede percibir colores y ve el mundo en blanco y negro debido a la ausencia o disfunción de los conos en los ojos.",
    "El color es una propiedad visual que nos permite identificar y reconocer objetos en función de su apariencia y su relación con el entorno y la iluminación.",
    "Los colores brillantes y saturados suelen transmitir una sensación de vitalidad y dinamismo, y se utilizan en diseños que buscan llamar la atención y generar impacto visual.",
    "El color es una herramienta utilizada en el diseño de embalajes y etiquetas de productos para atraer a los consumidores, comunicar información clave y destacarse en los estantes.",
    "Los colores suaves y neutros, como el gris y el beige, suelen transmitir una sensación de elegancia y sofisticación, y se utilizan en diseños minimalistas y contemporáneos.",
    "El color es una propiedad visual que nos permite distinguir y diferenciar objetos en función de su apariencia y características estéticas.",
    "La teoría del color se basa en la idea de que los colores pueden mezclarse y combinarse para crear una amplia gama de tonalidades y matices.",
    "El color es una herramienta utilizada en la señalización de emergencia para indicar rutas de evacuación, equipos de seguridad y peligros potenciales.",
    "La discromatopsia es una condición en la que una persona tiene dificultades para percibir ciertos colores debido a una alteración en los fotorreceptores de los ojos o en las vías visuales del cerebro.",
    "El color es una propiedad visual que nos permite interpretar y comprender el mundo que nos rodea, y nos brinda información sobre la identidad, estado y ubicación de los objetos.",
    "Los colores oscuros y profundos, como el negro y el morado, suelen transmitir una sensación de misterio y elegancia, y se utilizan en diseños sofisticados y lujosos.",
    "El color es una herramienta utilizada en el diseño de sitios web y aplicaciones móviles para crear interfaces atractivas, accesibles y fáciles de usar.",
    "La tetracromacia es una condición en la que una persona tiene un cuarto tipo de cono en los ojos, lo que le permite percibir un espectro más amplio de colores que la mayoría de las personas.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su significado cultural o simbólico.",
    "Los colores metálicos, como el dorado y el plateado, suelen transmitir una sensación de lujo y sofisticación, y se utilizan en diseños elegantes y glamorosos.",
    "El color es una herramienta utilizada en la psicología y terapia del color para influir en el estado de ánimo, reducir el estrés y promover el bienestar emocional.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite distinguir y clasificar objetos en función de su apariencia y características estéticas.",
    "Los colores tierra, como el marrón y el verde oliva, suelen transmitir una sensación de naturalidad y conexión con la tierra, y se utilizan en diseños rústicos y orgánicos.",
    "El color es una herramienta utilizada en el diseño de carteles y volantes publicitarios para captar la atención de las personas y comunicar mensajes de manera efectiva.",
    "La visión del color es un proceso complejo que involucra la interacción de la luz con los fotorreceptores en nuestros ojos, la transmisión de señales al cerebro y la interpretación de esas señales como colores.",
    "El color es una propiedad que nos permite interpretar y comprender la forma, textura y materialidad de los objetos a través de la vista.",
    "Los colores complementarios, como el azul y el naranja, suelen crear un contraste fuerte y vibrante, y se utilizan en diseños que buscan captar la atención y destacar visualmente.",
    "El color es una herramienta utilizada en la publicidad y el marketing para influir en las decisiones de compra, evocar emociones y comunicar los valores de una marca o producto.",
    "La daltonismo es una condición en la que una persona tiene dificultades para diferenciar ciertos colores debido a la ausencia o mal funcionamiento de los conos en los ojos.",
    "El color es una propiedad visual que nos permite distinguir y reconocer objetos en función de su apariencia y su relación con el entorno y la iluminación.",
    "Los colores brillantes y llamativos, como el amarillo brillante y el verde lima, suelen transmitir una sensación de energía y alegría, y se utilizan en diseños festivos y de celebración.",
    "El color es una herramienta utilizada en el diseño de productos y envases para transmitir información sobre su uso, características y estilo de vida asociado.",
    "Los colores patrióticos, como el rojo, blanco y azul en la bandera de muchos países, suelen evocar sentimientos de orgullo, lealtad y pertenencia nacional.",
    "El color es una propiedad que nos permite distinguir y recordar objetos en función de su apariencia visual y su relación con otros elementos en el entorno.",
    "El color es una herramienta utilizada en el diseño de interfaces de usuario para mejorar la legibilidad, jerarquía visual y usabilidad de aplicaciones y sitios web.",
    "La cromoterapia es una práctica terapéutica que utiliza colores para promover el equilibrio y el bienestar físico, emocional y espiritual.",
    "El color es una propiedad visual que puede ser interpretada de manera subjetiva y puede evocar diferentes respuestas y significados según el contexto cultural y personal.",
    "Los colores llamativos y contrastantes suelen utilizarse en el diseño de señales de tráfico y advertencia para llamar la atención y transmitir información de manera rápida y efectiva.",
    "El color es una herramienta utilizada en la fotografía y el cine para crear ambientes, transmitir emociones y contar historias a través de la paleta de colores.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y los interpretan como diferentes colores.",
    "El color es una propiedad que nos permite establecer relaciones visuales y jerarquías entre elementos en una composición, enfatizando unos y atenuando otros.",
    "Los colores pastel, como el rosa suave y el lavanda, suelen transmitir una sensación de suavidad y delicadeza, y se utilizan en diseños románticos y soñadores.",
    "El color es una herramienta utilizada en el diseño de productos y embalajes para transmitir la identidad de la marca, comunicar los valores y atraer a los consumidores.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, percepciones y comportamientos, y se aplica en campos como el marketing, el diseño y la terapia.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su relación con el contexto cultural y simbólico.",
    "Los colores claros y suaves, como el rosa pálido y el celeste, suelen transmitir una sensación de calma y tranquilidad, y se utilizan en diseños relajantes y serenos.",
    "El color es una herramienta utilizada en el diseño de interiores para crear ambientes, influir en el estado de ánimo y mejorar la estética de los espacios.",
    "Los colores vibrantes y cálidos, como el rojo y el naranja, suelen transmitir una sensación de energía y pasión, y se utilizan en diseños enérgicos y llamativos.",
    "El color es una propiedad visual que nos permite interpretar y comprender la profundidad, volumen y perspectiva de los objetos a través de la percepción de la luz.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, percepciones y comportamientos, y se aplica en campos como el marketing, el diseño y la terapia.",
    "El color es una herramienta utilizada en el diseño de moda y textiles para expresar creatividad, estilo y tendencias, y reflejar la personalidad y estado de ánimo del usuario.",
    "Los colores fríos, como el azul y el verde, suelen transmitir una sensación de calma y tranquilidad, y se utilizan en diseños que buscan crear ambientes relajantes y serenos.",
    "El color es una propiedad visual que nos permite distinguir y diferenciar objetos en función de su apariencia y características físicas y sensoriales.",
    "La percepción del color puede variar entre las personas debido a factores como la edad, la cultura, las experiencias personales y las condiciones de iluminación.",
    "El color es una herramienta utilizada en el diseño gráfico y la comunicación visual para transmitir mensajes, crear impacto visual y establecer una identidad visual sólida.",
    "Los colores terciarios, como el azul verdoso y el naranja amarronado, son el resultado de la mezcla de colores primarios y secundarios, y se utilizan en diseños que buscan tonalidades más sutiles y complejas.",
    "El color es una propiedad que nos permite organizar y categorizar objetos en función de su apariencia visual y su relación con otros elementos en un conjunto o sistema.",
    "El color es una herramienta utilizada en el diseño arquitectónico y la planificación urbana para crear espacios atractivos, funcionales y que se adapten al entorno y a las necesidades de las personas.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite interpretar y comprender el mundo que nos rodea, y nos brinda información sobre la identidad, estado y ubicación de los objetos.",
    "Los colores oscuros y profundos, como el negro y el morado, suelen transmitir una sensación de misterio y elegancia, y se utilizan en diseños sofisticados y lujosos.",
    "El color es una herramienta utilizada en el diseño de sitios web y aplicaciones móviles para crear interfaces atractivas, accesibles y fáciles de usar.",
    "La tetracromacia es una condición en la que una persona tiene un cuarto tipo de cono en los ojos, lo que le permite percibir un espectro más amplio de colores que la mayoría de las personas.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su significado cultural o simbólico.",
    "Los colores metálicos, como el dorado y el plateado, suelen transmitir una sensación de lujo y sofisticación, y se utilizan en diseños elegantes y glamorosos.",
    "El color es una herramienta utilizada en la psicología y terapia del color para influir en el estado de ánimo, reducir el estrés y promover el bienestar emocional.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite distinguir y clasificar objetos en función de su apariencia y características estéticas.",
    "Los colores tierra, como el marrón y el verde oliva, suelen transmitir una sensación de naturalidad y conexión con la tierra, y se utilizan en diseños rústicos y orgánicos.",
    "El color es una herramienta utilizada en el diseño de carteles y volantes publicitarios para captar la atención de las personas y comunicar mensajes de manera efectiva.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y los interpretan como diferentes colores.",
    "El color es una propiedad que nos permite distinguir y reconocer objetos en función de su apariencia y su relación con el entorno y la iluminación.",
    "Los colores brillantes y llamativos, como el amarillo brillante y el verde lima, suelen transmitir una sensación de energía y alegría, y se utilizan en diseños festivos y de celebración.",
    "El color es una herramienta utilizada en el diseño de productos y envases para transmitir información sobre su uso, características y estilo de vida asociado.",
    "Los colores patrióticos, como el rojo, blanco y azul en la bandera de muchos países, suelen evocar sentimientos de orgullo, lealtad y pertenencia nacional.",
    "El color es una propiedad que nos permite distinguir y recordar objetos en función de su apariencia visual y su relación con otros elementos en el entorno.",
    "El color es una herramienta utilizada en el diseño de interfaces de usuario para mejorar la legibilidad, jerarquía visual y usabilidad de aplicaciones y sitios web.",
    "La cromoterapia es una práctica terapéutica que utiliza colores para promover el equilibrio y el bienestar físico, emocional y espiritual.",
    "El color es una propiedad visual que puede ser interpretada de manera subjetiva y puede evocar diferentes respuestas y significados según el contexto cultural y personal.",
    "Los colores llamativos y contrastantes suelen utilizarse en el diseño de señales de tráfico y advertencia para llamar la atención y transmitir información de manera rápida y efectiva.",
    "El color es una herramienta utilizada en la fotografía y el cine para crear ambientes, transmitir emociones y contar historias a través de la paleta de colores.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y los interpretan como diferentes colores.",
    "El color es una propiedad que nos permite organizar y categorizar objetos en función de su apariencia visual y su relación con otros elementos en un conjunto o sistema.",
    "Los colores pastel, como el rosa suave y el lavanda, suelen transmitir una sensación de suavidad y delicadeza, y se utilizan en diseños románticos y soñadores.",
    "El color es una herramienta utilizada en el diseño de productos y embalajes para transmitir la identidad de la marca, comunicar los valores y atraer a los consumidores.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, percepciones y comportamientos, y se aplica en campos como el marketing, el diseño y la terapia.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su relación con el contexto cultural y simbólico.",
    "Los colores claros y suaves, como el rosa pálido y el celeste, suelen transmitir una sensación de calma y tranquilidad, y se utilizan en diseños relajantes y serenos.",
    "El color es una herramienta utilizada en el diseño de interiores para crear ambientes, influir en el estado de ánimo y mejorar la estética de los espacios.",
    "Los colores vibrantes y cálidos, como el rojo y el naranja, suelen transmitir una sensación de energía y pasión, y se utilizan en diseños enérgicos y llamativos.",
    "El color es una propiedad visual que nos permite interpretar y comprender la profundidad, volumen y perspectiva de los objetos a través de la percepción de la luz.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, percepciones y comportamientos, y se aplica en campos como el marketing, el diseño y la terapia.",
    "El color es una herramienta utilizada en el diseño de moda y textiles para expresar creatividad, estilo y tendencias, y reflejar la personalidad y estado de ánimo del usuario.",
    "Los colores fríos, como el azul y el verde, suelen transmitir una sensación de calma y tranquilidad, y se utilizan en diseños que buscan crear ambientes relajantes y serenos.",
    "El color es una propiedad visual que nos permite distinguir y diferenciar objetos en función de su apariencia y características físicas y sensoriales.",
    "La percepción del color puede variar entre las personas debido a factores como la edad, la cultura, las experiencias personales y las condiciones de iluminación.",
    "El color es una herramienta utilizada en el diseño gráfico y la comunicación visual para transmitir mensajes, crear impacto visual y establecer una identidad visual sólida.",
    "Los colores terciarios, como el azul verdoso y el naranja amarronado, son el resultado de la mezcla de colores primarios y secundarios, y se utilizan en diseños que buscan tonalidades más sutiles y complejas.",
    "El color es una propiedad que nos permite organizar y categorizar objetos en función de su apariencia visual y su relación con otros elementos en un conjunto o sistema.",
    "El color es una herramienta utilizada en el diseño arquitectónico y la planificación urbana para crear espacios atractivos, funcionales y que se adapten al entorno y a las necesidades de las personas.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite interpretar y comprender el mundo que nos rodea, y nos brinda información sobre la identidad, estado y ubicación de los objetos.",
    "Los colores oscuros y profundos, como el negro y el morado, suelen transmitir una sensación de misterio y elegancia, y se utilizan en diseños sofisticados y lujosos.",
    "El color es una herramienta utilizada en el diseño de sitios web y aplicaciones móviles para crear interfaces atractivas, accesibles y fáciles de usar.",
    "La tetracromacia es una condición en la que una persona tiene un cuarto tipo de cono en los ojos, lo que le permite percibir un espectro más amplio de colores que la mayoría de las personas.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su significado cultural o simbólico.",
    "Los colores metálicos, como el dorado y el plateado, suelen transmitir una sensación de lujo y sofisticación, y se utilizan en diseños elegantes y glamorosos.",
    "El color es una herramienta utilizada en la psicología y terapia del color para influir en el estado de ánimo, reducir el estrés y promover el bienestar emocional.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite distinguir y clasificar objetos en función de su apariencia y características estéticas.",
    "Los colores tierra, como el marrón y el verde oliva, suelen transmitir una sensación de naturalidad y conexión con la tierra, y se utilizan en diseños rústicos y orgánicos.",
    "El color es una herramienta utilizada en el diseño de carteles y volantes publicitarios para captar la atención de las personas y comunicar mensajes de manera efectiva.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y los interpretan como diferentes colores.",
    "El color es una propiedad que nos permite distinguir y reconocer objetos en función de su apariencia y su relación con el entorno y la iluminación.",
    "Los colores brillantes y llamativos, como el amarillo brillante y el verde lima, suelen transmitir una sensación de energía y alegría, y se utilizan en diseños festivos y de celebración.",
    "El color es una herramienta utilizada en el diseño de moda y textiles para expresar creatividad, estilo y tendencias, y reflejar la personalidad y estado de ánimo del usuario.",
    "Los colores fríos, como el azul y el verde, suelen transmitir una sensación de calma y tranquilidad, y se utilizan en diseños que buscan crear ambientes relajantes y serenos.",
    "El color es una propiedad visual que nos permite distinguir y diferenciar objetos en función de su apariencia y características físicas y sensoriales.",
    "La percepción del color puede variar entre las personas debido a factores como la edad, la cultura, las experiencias personales y las condiciones de iluminación.",
    "El color es una herramienta utilizada en el diseño gráfico y la comunicación visual para transmitir mensajes, crear impacto visual y establecer una identidad visual sólida.",
    "Los colores terciarios, como el azul verdoso y el naranja amarronado, son el resultado de la mezcla de colores primarios y secundarios, y se utilizan en diseños que buscan tonalidades más sutiles y complejas.",
    "El color es una propiedad que nos permite organizar y categorizar objetos en función de su apariencia visual y su relación con otros elementos en un conjunto o sistema.",
    "El color es una herramienta utilizada en el diseño arquitectónico y la planificación urbana para crear espacios atractivos, funcionales y que se adapten al entorno y a las necesidades de las personas.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite interpretar y comprender el mundo que nos rodea, y nos brinda información sobre la identidad, estado y ubicación de los objetos.",
    "Los colores oscuros y profundos, como el negro y el morado, suelen transmitir una sensación de misterio y elegancia, y se utilizan en diseños sofisticados y lujosos.",
    "El color es una herramienta utilizada en el diseño de sitios web y aplicaciones móviles para crear interfaces atractivas, accesibles y fáciles de usar.",
    "La tetracromacia es una condición en la que una persona tiene un cuarto tipo de cono en los ojos, lo que le permite percibir un espectro más amplio de colores que la mayoría de las personas.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su significado cultural o simbólico.",
    "Los colores metálicos, como el dorado y el plateado, suelen transmitir una sensación de lujo y sofisticación, y se utilizan en diseños elegantes y glamorosos.",
    "El color es una herramienta utilizada en la psicología y terapia del color para influir en el estado de ánimo, reducir el estrés y promover el bienestar emocional.",
    "La sinestesia es un fenómeno en el que una persona experimenta una conexión cruzada entre diferentes sentidos, como ver colores al escuchar música o asociar sabores con colores.",
    "El color es una propiedad visual que nos permite distinguir y clasificar objetos en función de su apariencia y características estéticas.",
    "Los colores tierra, como el marrón y el verde oliva, suelen transmitir una sensación de naturalidad y conexión con la tierra, y se utilizan en diseños rústicos y orgánicos.",
    "El color es una herramienta utilizada en el diseño de carteles y volantes publicitarios para captar la atención de las personas y comunicar mensajes de manera efectiva.",
    "La visión del color es un proceso en el que los fotorreceptores en nuestros ojos detectan diferentes longitudes de onda de la luz y los interpretan como diferentes colores.",
    "El color es una propiedad que nos permite distinguir y reconocer objetos en función de su apariencia y su relación con el entorno y la iluminación.",
    "Los colores brillantes y llamativos, como el amarillo brillante y el verde lima, suelen transmitir una sensación de energía y alegría, y se utilizan en diseños festivos y de celebración.",
    "El color es una herramienta utilizada en el diseño de productos y embalajes para transmitir la identidad de la marca, comunicar los valores y atraer a los consumidores.",
    "La psicología del color estudia cómo los colores pueden influir en nuestras emociones, percepciones y comportamientos, y se aplica en campos como el marketing, el diseño y la terapia.",
    "El color es una propiedad que nos permite identificar y diferenciar objetos en función de su apariencia visual y su relación con el contexto cultural y simbólico.",
    "Los colores claros y suaves, como el rosa pálido y el celeste, suelen transmitir una sensación de calma y tranquilidad, y se utilizan en diseños relajantes y serenos.",
    "El color es una herramienta utilizada en el diseño de interiores para crear ambientes, influir en el estado de ánimo y mejorar la estética de los espacios.",
    "Los colores vibrantes y cálidos, como el rojo y el naranja, suelen transmitir una sensación de energía y pasión, y se utilizan en diseños enérgicos y llamativos."
]
context_question = "¿Qué es el color?"
tokenizer = Tokenizer()
tokenizer.fit_on_texts(sentences + [context_question])
vocab_size = len(tokenizer.word_index) + 1
encoded_sentences = tokenizer.texts_to_sequences(sentences)
padded_sentences = pad_sequences(encoded_sentences, padding='post')
encoded_context_question = tokenizer.texts_to_sequences([context_question])
padded_context_question = pad_sequences(encoded_context_question, padding='post')
padded_context_question = np.repeat(padded_context_question, padded_sentences.shape[0], axis=0)
output_size = padded_sentences.shape[0]
print("Output size:", output_size)
print("Creating model")
target_labels = np.zeros((output_size,output_size))  # Cambia np.ones por np.zeros para clasificación binaria
print("Creating model")
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(vocab_size, 100, input_length=padded_sentences.shape[1]),
    tf.keras.layers.Bidirectional(tf.keras.layers.GRU(64, return_sequences=True)),
    tf.keras.layers.Bidirectional(tf.keras.layers.GRU(64)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(output_size, activation='sigmoid')
])
model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

print("Training model")
model.fit(padded_sentences, target_labels, epochs=100)
new_sentence = "El color es una percepción visual que nos permite distinguir diferentes tonalidades.",
#new_sentence = "Tu perra madre"
encoded_new_sentence = tokenizer.texts_to_sequences(new_sentence)
padded_new_sentence = pad_sequences(encoded_new_sentence, padding='post', maxlen=padded_sentences.shape[1])
print("Preddicting with: ",new_sentence)
predicted_context_question = model.predict(padded_new_sentence)
print(predicted_context_question)
decoded_context_question = tokenizer.sequences_to_texts(predicted_context_question.argmax(axis=0))[0]
print("Contexto de pregunta predicho:", decoded_context_question)