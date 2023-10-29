import { exec, execFile } from 'child_process'
import { promisify } from 'util'

const execFileAsync = promisify(execFile)

export async function runProcess(exe: string, args: string[]) {
    let { stdout, stderr } = await execFileAsync(exe, args)
    return stdout + stderr
}
