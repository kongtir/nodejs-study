var fs=require('fs');
fs.readdir('.',function (err, filenames) {
    var i;
    for(i=0;i<filenames.length;i++){
        console.log(filenames[i]);
    }
    console.log("End FilesName.")
});
console.log("End Program.");
 