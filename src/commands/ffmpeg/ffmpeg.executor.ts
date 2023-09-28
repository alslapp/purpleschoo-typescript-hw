import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface';
import { ICommandExecFfmpeg, IFfmpefInput } from './ffmpeg.types';
import { PromptService } from '../../core/prompt/prompt.service';
import { FileService } from '../../core/files/files.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { StreamHandler } from '../../core/handlers/stream.handler';

export class FfmpegExecutor extends CommandExecutor<IFfmpefInput> {
	private fileService: FileService = new FileService();
	private promptService: PromptService = new PromptService();

	constructor(logger: IStreamLogger) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpefInput> {
		const width = await this.promptService.input<number>('Ширина', 'number');
		const height = await this.promptService.input<number>('Высота', 'number');
		const path = await this.promptService.input<string>('Путь до файла', 'input');
		const name = await this.promptService.input<string>('Имя файла', 'input');
		return { width, height, path, name };
	}

	protected build({ width, height, path, name }: IFfmpefInput): ICommandExecFfmpeg {
		const output = this.fileService.getFilePath(path, name, 'mp4');

		console.log('output', output);

		const args = new FfmpegBuilder().input(path).setVideoSize(width, height).output(output);
		return {
			command: 'ffmpeg',
			args,
			output,
		};
	}

	protected spawn({ command, args, output }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
		this.fileService.deleteFileIfExists(output);
		return spawn(command, args);
	}

	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
		const handler = new StreamHandler(logger);
		handler.processOutput(stream);
	}
}
