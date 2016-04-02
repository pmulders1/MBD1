function GeoCachingModel(){
	var self = this;

	//Members
    self.caches = [];
    
    self.AddCache = function(cache){
        self.caches.push(cache);
    } 
};