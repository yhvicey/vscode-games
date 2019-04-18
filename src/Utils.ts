import * as path from "path";
import * as vscode from "vscode";

export default class Utils {
    public static getDiskPath(context: vscode.ExtensionContext, ...parts: string[]) {
        let p = context.extensionPath;
        parts.forEach(part => p = path.join(p, part));
        return vscode.Uri.file(p);
    }

    public static getVscodeResourcePath(context: vscode.ExtensionContext, relativePath: string) {
        const diskPath = this.getDiskPath(context, relativePath);
        return diskPath.with({ scheme: "vscode-resource" }).toString();
    }
}
