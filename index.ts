/**
 * Checks if the input string represents localhost
 * @param input - The string to check (can be a hostname, IP, or URL)
 * @returns true if the input refers to localhost, false otherwise
 */
export function isLocalhost(input: string): boolean {
  if (!input || typeof input !== 'string') {
    return false;
  }

  // Trim whitespace
  const trimmed = input.trim();
  
  // Direct localhost values
  const localhostValues = ['localhost', '127.0.0.1', '::1'];
  
  // Check if it's a direct match
  if (localhostValues.includes(trimmed.toLowerCase())) {
    return true;
  }
  
  // Check for IPv4 loopback range (127.0.0.0/8) in direct input
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(trimmed)) {
    const parts = trimmed.split('.').map(Number);
    if (parts.every(part => part >= 0 && part <= 255)) {
      return true;
    }
  }
  
  // Check for IPv6 long form directly
  if (trimmed.toLowerCase() === '0000:0000:0000:0000:0000:0000:0000:0001') {
    return true;
  }
  
  // Try to parse as URL
  try {
    const url = new URL(trimmed);
    let hostname = url.hostname.toLowerCase();
    
    // Remove brackets from IPv6 addresses in URLs
    if (hostname.startsWith('[') && hostname.endsWith(']')) {
      hostname = hostname.slice(1, -1);
    }
    
    // Check if hostname is localhost
    if (localhostValues.includes(hostname)) {
      return true;
    }
    
    // Check for IPv4 loopback range (127.0.0.0/8)
    if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname)) {
      const parts = hostname.split('.').map(Number);
      if (parts.every(part => part >= 0 && part <= 255)) {
        return true;
      }
    }
    
    // Check for IPv6 loopback (::1 with possible zeros)
    if (hostname === '::1' || hostname === '0000:0000:0000:0000:0000:0000:0000:0001') {
      return true;
    }
    
  } catch (error) {
    // Not a valid URL, already checked direct values above
    return false;
  }
  
  return false;
}

// Default export for convenience
export default isLocalhost;
