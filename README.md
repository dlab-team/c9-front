# c9-front

Frontend para C9 InnovaXD

# Descripción del proyecto InnovaXD

Nuestro proyecto, en colaboración con Microsoft y el diario El Mercurio, consiste en desarrollar una aplicación web que permitirá a los administradores y editores del diario transformar noticias para que sean aptas para niños. A través de nuestra herramienta, podrán copiar y pegar una noticia en su formato original, y la aplicación se encargará de adaptarla a una versión adecuada para la lectura infantil. Esta asociación con Microsoft y El Mercurio garantiza la utilización de tecnología de vanguardia y la experiencia periodística de renombre para ofrecer una experiencia segura y enriquecedora, manteniendo a los niños informados de manera apropiada para su edad y fomentando su interés por la lectura.

![Logo del proyecto](../assets/images/logo_innova_blue.jpg)

## Dependencias

- React: versión 18.2.0
- Tailwind CSS: versión 3.3.2
- TW-elements: version 1.0.0-beta2
- Google Fonts
- FontAwesome

## Instalación

Para instalar el proyecto, asegúrese de tener Node.js instalado y ejecute el siguiente comando:

```bash
npm install
```

## Ejecución

Para ejecutar el proyecto, use el siguiente comando:

```bash
npm start
```

## Variables de entorno

```bash
cp .env.example .env
```

dentro del archivo .env se debe configurar la url del backend

```bash
PORT=3001

REACT_APP_BACKEND_URL=http://localhost:3000
```

la variable de entorno tiene que estar asi, de otro modo no traera las publicaciones

## cabe recalcar que EL BACK DEBE ESTAR CORRIENDO!!!

## se deben correr el seed, levantar docker-compose y correr el servicio 'npm run dev'!!!

## Recursos adicionales

Este proyecto utiliza Google Fonts para la fuente de la interfaz de usuario y Font Awesome para los iconos. Los enlaces para la carga de estos recursos se encuentran en el archivo index.html en la carpeta public.

Fonts:

- Caveat Brush
- Sora

Links google fonts

```bash
<link
      href="https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap"
      rel="stylesheet"
/>
<link
      href="https://fonts.googleapis.com/css2?family=Sora&display=swap"
      rel="stylesheet"
/>
```

Diseño Figma del proyecto

- [Link](https://www.figma.com/file/VnhCQuQqPkpG91cMHEJMIG/Edición-Proyecto?type=design&node-id=4-596&t=nuNz0b38I35khcBI-0)

## Equipo

Technical Leader:

TL: [Sebastian Vidal Aedo](https://github.com/sebavidal10)

Frontend

- [Carolina Morah](url)
- [Ray Cardenas](url)
- [Carlos Garcia](url)
- [Gabriel Balbontin](url)
- [Alfredo Villegas](url)
- [Marco Camargo](url)
- [Javier Figueroa](url)

Backend

- [Rene Donaire](url)
- [Agustin Zapata](url)
- [Alejandro Gonzalez](url)
- [Santiago Cisneros](url)
- [Miguel Viloria](url)
- [Joaquin](url)
