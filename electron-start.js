
const { spawn } = require('child_process');
const { join } = require('path');
const { createServer } = require('vite');
const waitOn = require('wait-on');

async function startElectron() {
  // Set environment variables
  process.env.IS_ELECTRON = 'true';
  process.env.NODE_ENV = 'development';
  
  // Start Vite dev server
  const vite = await createServer({
    configFile: join(__dirname, 'vite.config.ts'),
    mode: 'development',
  });
  
  await vite.listen(8080);
  console.log('Vite server started at http://localhost:8080');
  
  // Wait for Vite server to be ready
  await waitOn({ resources: ['http://localhost:8080'] });
  
  // Start Electron
  const electronProcess = spawn('electron', ['.'], { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  electronProcess.on('close', () => {
    vite.close();
    process.exit();
  });
}

startElectron().catch(err => {
  console.error('Failed to start Electron app:', err);
  process.exit(1);
});
