Директория конфигурации webpack

# ./dll

конфигурация для webpack.DllPlugin.
1. Название папки - смысловая нагрузка на содержание.
2. config.js - подключение необходимых библиотек из node_modules.
3. dll.config.js - конфиг для webpack в npm скрипте.
4. dll.js - сгенерированный файл с исходниками.
5. manifest.json - сгенерированная мапка для плагина webpack.DllReferencePlugin.

4,5 файлы генерируются вручную при изменении config.js.
в dist копируется dll.js.
