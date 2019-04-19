# VS Code Games

Tiny games for break time!

Usage: Press `F1`, type `Games:`, then choose the game you want to play!

## Games

Name | Description | Note
--- | --- | ---
Dino | Chrome easter egg | From [wayou/t-rex-runner](https://github/wayou/t-rex-runner)

## Adding new game

- Put all assets that can be packed by webpack (global stylesheet, script, etc.) under `src/Games/<Game Name>` folder, import all of them in the entry file.

```text
.
|- src
    |- Games
        |- Dino
            |- Dino.js // Entry file
            |- Dino.css // Style file, imported by Dino.js
            |- Dino.html // Game web view, packed game assets will be ejected in
```

- Put all assets that cannot be packed by webpack under `Games/<Game Name>`.

```text
.
|- Games
    |- Dino
        |- (Non-packable assets)
|- src
    |- Games
        |- Dino
            |- Dino.js // Entry file
            |- Dino.css // Style file, imported by Dino.js
```

- Create an `html` file using the assets here, and game should be hosted in this file. Packed asset file can be sourced by `<script src="${gameBinPath}"></script>`, non-packable assets can be sourced by prefixing urls with `${assetsRoot}`, which will point to the asset folder in above step (`Games/<Game Name>`).

```html
<head>
    <script src="${gameBinPath}"></script>
</head>

<body>
    <img src="${assetsRoot}/path/to/your/image" />
</body>
```

- Put the html file under `src/Games/<Game Name>` folder, create an `index.ts`, import this file, resolve it using `Utils.resolveGameHtml(context, html, gameName)`, then create the game view.

```typescript
// index.ts
export default class Dino {
    public static start(context: vscode.ExtensionContext) {
        const resolvedHtml = Utils.resolveGameHtml(context, html, GameName);
        const view = new GameView(resolvedHtml, {
            title: GameName
        });
        view.show();
    }
}
```

- Create corresponding command in `extensions.ts`.

```typescript
context.subscriptions.push(
    vscode.commands.registerCommand("games.startDino", async () => {
        Dino.start(context);
    })
);
```

- Modify `package.json`, add newly added command.

```json
...
"contributes": {
    "commands": [
        {
            "command": "games.startDino",
            "title": "Start Dino (Chrome Easter Egg)",
            "category": "Games"
        }
    ]
}
...
```