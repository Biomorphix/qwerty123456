$('#windowControlMinimize').click(function() {
  win.minimize();
});
$('#windowControlClose').click(function() {
  win.close();
});
$('#windowControlMaximize').click(function() {
  if (win.isMaximized)
    win.unmaximize();
  else
    win.maximize();
});
win.on('maximize', function(){
  win.isMaximized = true;
});
win.on('unmaximize', function(){
  win.isMaximized = false;
});