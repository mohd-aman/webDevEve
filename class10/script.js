

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
        console.log(a);
        function grandchild(){
            var a = 10;
        }
        grandchild();
    }
    child();
}

parent();