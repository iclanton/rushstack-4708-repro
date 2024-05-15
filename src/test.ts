import { CommandLineAction, CommandLineChoiceParameter, CommandLineFlagParameter, CommandLineParser } from '@rushstack/ts-command-line';

export class PushAction extends CommandLineAction {
    private _force!: CommandLineFlagParameter;
    private _protocol!: CommandLineChoiceParameter;

    public constructor() {
        super({
            actionName: 'push',
            summary: 'Pushes a widget to the service',
            documentation: 'Here we provide a longer description of how our action works.'
        });
    }

    protected onExecute(): Promise<void> { // abstract
        // return BusinessLogic.doTheWork(this._force.value, this._protocol.value || "(none)");
        console.log('PushAction.onExecute', this._force.value, this._protocol.value);
        return Promise.resolve();
    }

    protected onDefineParameters(): void { // abstract
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

export class WidgetCommandLine extends CommandLineParser {
    private _verbose!: CommandLineFlagParameter;

    public constructor() {
        super({
            toolFilename: 'widget',
            toolDescription: 'The "widget" tool is a code sample for using the @rushstack/ts-command-line library.',
        });

        this.addAction(new PushAction());
    }

    protected onDefineParameters(): void { // abstract
        this._verbose = this.defineFlagParameter({
            parameterLongName: '--verbose',
            parameterShortName: '-v',
            description: 'Show extra logging detail',
        });
    }

    protected onExecute(): Promise<void> { // override
        console.log('WidgetCommandLine.onExecute', this._verbose);
        return super.onExecute();
    }
}

const commandLine: WidgetCommandLine = new WidgetCommandLine();
commandLine.execute();