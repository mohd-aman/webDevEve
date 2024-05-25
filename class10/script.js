

// function fxn(){
    
//     console.log(a); 
//     function gxn(){
//         var a = 10;       
//     }

//     gxn();
// }

// fxn();

function parent(){
    function child(){
        var a = 10;
        function grandchild(){
            console.log(a);
        }
        grandchild();
    }
    child();
}

parent();