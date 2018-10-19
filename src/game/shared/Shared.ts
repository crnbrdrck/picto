import { isNode } from 'detect-node'

/**
 * If this variable is true, we are on the client
 * TODO: we might use electron in the future, better be careful...
 * @see src/game/client/Client.ts, defines game.CLIENT
 */
export function IS_CLIENT() : boolean {
  return !isNode
}

/**
 * If this variable is true, we are on the server
 * @see src/game/server/Server.ts, defines game.SERVER
 */
export function IS_SERVER() : boolean {
  return isNode
}
