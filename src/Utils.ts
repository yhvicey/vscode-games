import * as path from "path";
import * as vscode from "vscode";

export default class Utils {
    public static asVscodeResource(uri: vscode.Uri) {
        return uri.with({ scheme: "vscode-resource" }).toString();
    }

    public static getDiskUri(context: vscode.ExtensionContext, ...parts: string[]) {
        let p = context.extensionPath;
        parts.forEach(part => p = path.join(p, part));
        return vscode.Uri.file(p);
    }

    public static getGameAssetsRoot(context: vscode.ExtensionContext, game: string) {
        return this.getDiskUri(context, "Games", game);
    }

    public static getGameBinPath(context: vscode.ExtensionContext, game: string) {
        return this.getDiskUri(context, "dist", `${game}.js`);
    }

    public static resolveGameHtml(context: vscode.ExtensionContext, html: string, game: string) {
        const gameBinPath = this.asVscodeResource(this.getGameBinPath(context, game));
        const assetsRoot = this.asVscodeResource(this.getGameAssetsRoot(context, game));

        return html.replace("${gameBinPath}", gameBinPath).replace(/\$\{assetsRoot\}/g, assetsRoot);
    }
}
