(function($){
    
    xfade = function(elem, options){
        var data = {
            interval: null,
            elems: [],
            current: 0,
            playing: false,
            next: function(){},
            prev: function(){},
            stop: function(){},
            play: function(){},
            settings: $.extend({
                next_button: null,
                prev_button: null,
                interval: 4000,
                speed: 200,
                elems: '',
                autoplay: true
            }, options)
        }
        
        function reset_interval(){
            clear_interval();
            data.interval = setInterval(tick, data.settings.interval);
        }
        
        function clear_interval(){
            try{
                clearInterval(data.interval);
            } catch(e){}
        }
        
        function tick(){
            data.next();
        }
        
        data.prev = function(){
            if(data.playing)
                clear_interval();
            $(data.elems[data.current]).fadeOut(data.settings.speed, function(){
                data.current--;
                if(data.current < 0)
                    data.current = data.elems.length - 1;
                if(data.playing)
                    reset_interval();
                $(data.elems[data.current]).fadeIn(data.settings.speed);
            });
            return data;
        };
        
        data.next = function(){
            if(data.playing)
                clear_interval();
            $(data.elems[data.current]).fadeOut(data.settings.speed, function(){
                data.current++;
                if(data.current >= data.elems.length)
                    data.current = 0;
                
                if(data.playing)
                    reset_interval();
                $(data.elems[data.current]).fadeIn(data.settings.speed);
            });
            return data;
        };
        
        data.play = function(){
            data.playing = true;
            reset_interval();
            return data;
        }
        
        data.stop = function(){
            data.playing = false;
            clear_interval();
            return data;
        }
        
        $(data.settings.next_button).bind('click', function(ev){
            data.next();
            return false;
        });
        $(data.settings.prev_button).bind('click', function(ev){
            data.prev();
            return false;
        });
        
        data.elems = $(elem).children(data.settings.elems).get();
        if(data.settings.autoplay)
            data.play();
        return data;
    }
    
    $.fn.xfade = function(options){
        return $(this).each(function(){
            $(this).data('xfade', xfade(this, options));
        });
    }

})(jQuery);
