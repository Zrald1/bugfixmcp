import * as fs from 'fs';
import * as path from 'path';

/**
 * Check if a directory is a Next.js project
 * 
 * @param directory The directory to check
 * @returns True if the directory is a Next.js project, false otherwise
 */
export async function isNextJsProject(directory: string): Promise<boolean> {
  try {
    // Check if package.json exists
    const packageJsonPath = path.join(directory, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return false;
    }
    
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Check if next is a dependency
    const hasDependency = packageJson.dependencies && packageJson.dependencies.next;
    const hasDevDependency = packageJson.devDependencies && packageJson.devDependencies.next;
    
    if (!hasDependency && !hasDevDependency) {
      return false;
    }
    
    // Check for Next.js specific directories
    const hasPagesDir = fs.existsSync(path.join(directory, 'pages'));
    const hasAppDir = fs.existsSync(path.join(directory, 'app'));
    const hasNextConfig = fs.existsSync(path.join(directory, 'next.config.js')) || 
                          fs.existsSync(path.join(directory, 'next.config.mjs'));
    
    // If it has next as a dependency and at least one of the Next.js specific directories or config
    return hasPagesDir || hasAppDir || hasNextConfig;
  } catch (error) {
    console.error('Error detecting Next.js project:', error);
    return false;
  }
}
