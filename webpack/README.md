Директория конфигурации webpack

# ./dll

конфигурация для webpack.DllPlugin.
1. webpack.config.js - конфиг для webpack в npm скрипте.
2. build/[name].dll.js - сгенерированный файл с исходниками.
5. build/[name].manifest.json - сгенерированная мапка для плагина webpack.DllReferencePlugin.

файлы генерируются вручную при изменении конфигурации
цепляются в html плагином add-asset-html-webpack-plugin
