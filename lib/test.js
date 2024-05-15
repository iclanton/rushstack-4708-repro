"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetCommandLine = exports.PushAction = void 0;
const ts_command_line_1 = require("@rushstack/ts-command-line");
class PushAction extends ts_command_line_1.CommandLineAction {
    constructor() {
        super({
            actionName: 'push',
            summary: 'Pushes a widget to the service',
            documentation: 'Here we provide a longer description of how our action works.'
        });
    }
    onExecute() {
        // return BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
        console.log('PushAction.onExecute', this._force.value, this._protocol.value);
        return Promise.resolve();
    }
    onDefineParameters() {
        this._force = this.defineFlagParameter({
            parameterLongName: '--force',
            parameterShortName: '-f',
            description: 'Push and overwrite any existing state'
        });
        this._protocol = this.defineChoiceParameter({
            parameterLongName: '--protocol',
            description: 'Specify the protocol to use',
            alternatives: ['ftp', 'webdav', 'scp'],
            environmentVariable: 'WIDGET_PROTOCOL',
            defaultValue: 'scp'
        });
    }
}
exports.PushAction = PushAction;
class WidgetCommandLine extends ts_command_line_1.CommandLineParser {
    constructor() {
        super({
            toolFilename: 'widget',
            toolDescription: 'The "widget" tool is a code sample for using the @rushstack/ts-command-line library.',
        });
        this.addAction(new PushAction());
    }
    onDefineParameters() {
        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Show extra logging detail',
        });
    }
    onExecute() {
        console.log('WidgetCommandLine.onExecute', this._verbose);
        return super.onExecute();
    }
}
exports.WidgetCommandLine = WidgetCommandLine;
const commandLine = new WidgetCommandLine();
commandLine.execute();
