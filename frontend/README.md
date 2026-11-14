# Frontend de Farmacia Tapia

Copiá esta carpeta frontend al mismo nivel que Backend.

Desde Backend ejecutá npm ci y luego npm start.
Desde frontend, en otra terminal, ejecutá npm install y luego npm run dev.
Abrí la URL que imprime Vite. El proxy reenvía /api al backend en el puerto 3000.

Para compilar ejecutá npm run build. Para probar esa compilación, ejecutá npm run preview con el backend encendido. Si publicás dist, configurá el servidor para reenviar /api al backend.

La navegación incluye Inicio, Productos, Nosotros y Contacto. En Productos, el botón Gestionar productos permite crear, editar y eliminar registros. Las categorías se obtienen de /api/categorias. El buscador y los filtros trabajan sobre los productos recibidos de la API.

El backend guarda los registros en Backend/data/productos.json. Este archivo se crea al guardar productos y se excluye de Git. Los registros anteriores sin categoría se muestran como Otros. Para usar otra ubicación, configurar PRODUCTOS_ARCHIVO antes de iniciar el backend.

Las fotografías se encuadran con CSS desde las capturas de referencia incluidas en src/assets. Las fuentes y el mapa requieren conexión a Internet. La gestión está disponible para la demostración local, sin autenticación.
