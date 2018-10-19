
export interface IEntryPoint
{
    /**
     * Main entrypoint implemented by inherited classes (see Client.ts, Server.ts)
     * @param argv An array of strings (command parameters seperated by space)
     */
    run(argv: Array<string>) : void
}
