import * as vscode from "vscode";

import { GameView } from "../GameView";

import html from "@Games/Dino/game.html";
import Utils from "@/Utils";

const GameName: string = "Dino";

export default class Dino {
    public static start(context: vscode.ExtensionContext) {
        const scriptPath = Utils.getGameAssetPath(context, GameName, "game.js");
        const stylePath = Utils.getGameAssetPath(context, GameName, "game.css");

        let resolvedHtml = html.replace("${scriptPath}", scriptPath);
        resolvedHtml = resolvedHtml.replace("${stylePath}", stylePath);
        const view = new GameView(resolvedHtml, {
            title: GameName
        });
        view.show();
    }
}
