import { execSync } from 'child_process'

/**
 * Get the last modified date of a file using git
 * Falls back to current date if git fails or file is not tracked
 */
export function getLastModifiedDate(filePath: string): Date {
  try {
    // Get the timestamp of the last commit that modified this file
    const timestamp = execSync(
      `git log -1 --format=%ct -- ${filePath}`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim()
    
    if (timestamp && timestamp !== '') {
      return new Date(parseInt(timestamp) * 1000)
    }
  } catch (error) {
    // Silently fall through to default
  }
  
  // Fallback to current date for new/untracked files
  return new Date()
}

/**
 * Get last modified date for the homepage
 */
export function getHomePageLastModified(): Date {
  return getLastModifiedDate('app/page.tsx')
}

/**
 * Get last modified date for a tool page
 */
export function getToolPageLastModified(toolPath: string): Date {
  return getLastModifiedDate(`app/tools/${toolPath}/page.tsx`)
}
