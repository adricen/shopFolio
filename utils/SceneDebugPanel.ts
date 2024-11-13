import { FolderApi, Pane } from 'tweakpane'

export default class DebugPanel extends Pane {
    private static  _instance: DebugPanel;
    constructor() {
        super({ title: 'Scene Debug Panel' });
    }
    static get pane(): DebugPanel {
        if (!DebugPanel._instance) {
            DebugPanel._instance = new DebugPanel();
        }
        return DebugPanel._instance;
    }
    static addFolder(name: string) {
        return DebugPanel.pane.addFolder({ title: name });
    }

    static getFolder(name?: string, folder: FolderApi = DebugPanel.pane): FolderApi | undefined {
        if (!name || folder?.title === name) {
            return folder;
        }
        let childrenArray: FolderApi[] = [];
        if (folder instanceof FolderApi) {
            childrenArray = folder.children as FolderApi[];
        }
        const found = childrenArray
            .map((child) => DebugPanel.getFolder(name, child))
            .find((foundFolderOrTab) => foundFolderOrTab instanceof FolderApi);
        return found;
    }


}