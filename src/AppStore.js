var Reflux = require('reflux');
var request = require('superagent');
var AppActions = require('./AppActions');
var Remote = require('./Remote');

//var api_key = '095eaae6f523d439868754b7c4086b72';
var messages = ["miau"];
var movies = [];
var tv = [];
var AppStore = Reflux.createStore({

	listenables: AppActions,
	onAddMessage: function (message) {
		messages.push(message);
		this.trigger({messages: messages});
	},
	/*onGetMovies: function () {
		request.get('http://xfinitytv.comcast.net/movie.widget')
			.end(function(err, res){
	    		movies = parseMovies(res.text);
	    		this.trigger({movies: movies});
			}.bind(this));
	},*/
	onGetMovies: function () {
		request.get('http://api.themoviedb.org/3/movie/popular', {api_key: Remote.api_key})
			.end(function(err, res){
	    		movies = res.body.results;
	    		this.trigger({movies: movies});
			}.bind(this));
	},

	onGetTv: function () {
		request.get('http://api.themoviedb.org/3/tv/popular', {api_key: Remote.api_key})
			.end(function(err, res){
	    		tv = res.body.results;
	    		this.trigger({tv: tv});
			}.bind(this));
	},

	onGetSports: function () {
		//request.get('sports.html')
		request.get('http://xfinitytv.comcast.net/microsite/sports')
			.end(function(err, res){
	    		sports = parseSports(res.text);
	    		console.log(sports);
	    		this.trigger({sports: sports});
			}.bind(this));
	},

    onGetLiveTv: function (provider) {
        //request.get('http://ghid-electronic.upc.ro/TV/wa/grid/?startDateTime=2015-05-12T17:00:00Z')
        switch (provider) {
            case 'dya':
                request.get('dya-epg.json').end(function (err, res) {
                    console.log(res);
                    livetv = adapterDya(res.body);
                    this.trigger({livetv:livetv,  dya: true});
                }.bind(this));
                break;
            case 'upc':
                request.get('upc-listing.html')
                .end(function(err, res){
                    livetv = adapterUpc(res.text);
                    console.log(livetv);
                    this.trigger({livetv: livetv, dya: false});
                }.bind(this));
                break;
            case 'digi':
                request.get('digi-channels.json')
                .end(function(err, res){
                    var ch = res.body;
                    request.get('digi-programs.json')
                    .end(function(err, res){
                        console.log('programs', res.body);
                        var pr = res.body;
                        livetv = adapterDigi(ch, pr);
                        //console.log(res);
                        this.trigger({livetv: livetv, dya: false});
                    }.bind(this));
                    /*livetv = adapterDigi(res.body);
                    console.log(res);
                    this.trigger({livetv: livetv});*/
                }.bind(this));
                break;
            default: 

                console.log('unknown provider');

        }
        
    },

    onGetAssetVideos: function (id) {
        console.log()
    },

	getInitialState: function () {
		return {messages: messages};
	},
	getMovies: function () {
		return {movies: movies};
	}, 
	onSelectMovie: function (movie) {
		console.log('should go to ', movie);
	},
    getStation: function (station_code) {
        var st = livetv.filter(function (s) {
            return (s.meta.title == station_code)
        });
        return st[0];
    }
});

module.exports = AppStore;

function adapterDya(epg) {
    var res = epg.map(function (element, index) {
        return {
            meta: {
                title: element.station_code,
                url: element.url,
                position: index+1
            },
            programs: element.data.map(function (p) {
                var s = new Date(p.start_date);
                var e = new Date(p.end_date);
                return {
                    title: p.programtitle,
                    time: s.getHours() + ":" + s.getMinutes() + " - " + e.getHours() + ":" + e.getMinutes(),
                    desc: "genre: " + p.genre
                }
            })
        }
    });

    return res;
}

function adapterDigi(ch, pr) {
    var res = ch.map(function (element) {
        console.log(element);
        return {
            baseurl: 'http://ghidtv.rcs-rds.ro/',
            meta: {
                title: element.name,
                url: element.link,
                hd: false,
                position: element.epg_id_dpx,
                logo: element.logo
            },
            programs: pr[element.id].map(function (p) {
                return {
                    title: p.title_ro,
                    time: p.hour + " - " + p.stop,
                    desc: p.short_description
                }
            })
        }
    });

    return res;
}

function adapterUpc(html) {
    var res = [];
    var node = $(html);
    var baseurl = 'http://ghid-electronic.upc.ro/';
    var channels0 = node.find('ol');
    // console.log(channels0);
    var channels1 = $.map(channels0, function(element) {  
        //console.log(element);
        var el = element;
        var meta = $(el).find('li:first-child');
        var prog = $(el).find('li:not(:first-child)')
        return {
            meta: {
                title: meta.find('div.channel_name a.channel').prop('title'),
                url: baseurl + meta.find('div.channel_name a.channel').attr('href'),
                hd: meta.find('div.meta_logo.hd').length > 0,
                position: meta.find('div.channel_position').prop('title')
            },
            programs: $.map(prog, function (p) {
                return {
                    title: $(p).find('a').text(),
                    time: $(p).find('span.time').text(),
                    desc: $(p).find('p.desc').text()
                }
            })
        }
    });
    console.log(channels1);
    return channels1;
}

function parseMovies(data) {
    var anchor_REGEX = /<a[^>]*>([^<]+)<\/a>/g;
    var temp = data.match(anchor_REGEX).splice(0, 200);
    var result = [];
    //console.log(temp);
    temp.forEach(function (element) {
    	var r = 
        {
            url: /href="([^"]*)"/.exec(element)[1],
            id: /id="([^"]*)"/.exec(element)[1],
            title: /data-t="([^"]*)"/.exec(element)[1],
            videoId: /data-v="([^"]*)"/.exec(element)[1],
            popularity: 0,
        };

        var p = /data-pop="([^"]*)"/.exec(element);
        r.popularity = p && p[1];

        if (r.popularity > 100) 
        	result.push(r);
    });
    console.log('result is', result);

    return result;
}



function parseSports(html) {
	//console.log('parsing sports', html);
	
	
	
	
	var bg_re = /background-image: url\((.*?)\)/;
	var li_re = /<li[^>]*>(.|\n)*?<\/li>?/g;
	var ul_re = /<ul class="carousel-items"[^>]*>(.|\n)*?<\/ul>?/g;
	var title_re = /<h1>(.*?)<\/h1>/;

	var featured = [];
	var featured_re = /<section id="featured-events"[^>]*>(.|\n)*?<\/section>?/g;

	var feat = html.match(featured_re)[0];
	var feat_ul = ul_re.exec(feat)[0];
	var feat_li = feat_ul.match(li_re);
	var feat_bg = feat.match(bg_re)[1];
	var feat_title = feat.match(title_re)[1];
	//console.log(feat_li, feat_bg);

	feat_li.forEach(function (element) {
    	var r = 
        {
            img: /<div class="content">(.|\n)*? data-src="([^"]*)"?/.exec(element)[2],
            id: /data-resource-id="([^"]*)"/.exec(element)[1]            
        };

        featured.push(r);
    });


	var live = [];
    var live_re = /<section id="live-sports"[^>]*>(.|\n)*?<\/section>?/g;
    var li_re2 = /<a[^>]*>(.|\n)*?<\/a>+/g;
    var livesection = html.match(live_re)[0];
	var live_ul = livesection.match(ul_re)[0];
	var live_li = live_ul.match(li_re2);
	var live_bg = livesection.match(bg_re)[1];
	var live_title = livesection.match(title_re)[1];

	live_li.forEach(function (element) {
    	var r = 
        {            
            url: /href="([^"]*)"/.exec(element)[1],
            img: /data-src="([^"]*)"/.exec(element)[1]
        };

        live.push(r);
    });

    var nba = [];
    var nba_more;
    var nba_re = /<section id="nba"[^>]*>(.|\n)*?<\/section>?/g;
    var nbasection = html.match(nba_re)[0];
    var anchor_re = /<a[^>]*>(.|\n)*?<\/a>+/g;
    var nba_a = nbasection.match(anchor_re);
    var nba_bg = nbasection.match(bg_re)[1];
    var nba_title = nbasection.match(title_re)[1];
    console.log(nba_title);
	nba_a.forEach(function (element, index) {
		if(index == (nba_a.length-1)) {
			nba_more = /href="([^"]*)"/.exec(element)[1];
			return;
		}
    	var r = 
        {            
            url: /href="([^"]*)"/.exec(element)[1],
            img: /data-src="([^"]*)"/.exec(element)[1],
            title: /data-title="([^"]*)"/.exec(element)[1],
        };

        nba.push(r);
    });

    var nhl = [];
    var nhl_more;
    var nhl_re = /<section id="nhl"[^>]*>(.|\n)*?<\/section>?/g;
    var nhlsection = html.match(nhl_re)[0];
    var anchor_re = /<a[^>]*>(.|\n)*?<\/a>+/g;
    var nhl_a = nhlsection.match(anchor_re);
    var nhl_bg = nhlsection.match(bg_re)[1];
    var nhl_title = nhlsection.match(title_re)[1];
    console.log(nhl_title);
	nhl_a.forEach(function (element, index) {
		if(index == (nhl_a.length-1)) {
			nhl_more = /href="([^"]*)"/.exec(element)[1];
			return;
		}
    	var r = 
        {            
            url: /href="([^"]*)"/.exec(element)[1],
            img: /data-src="([^"]*)"/.exec(element)[1],
        };

        nhl.push(r);
    });

    console.log('nhl', nhl);

    return {
    	featured: {
    		title: feat_title,
    		list: featured,
    		background: feat_bg
    	},
    	live: {
    		title: live_title,
    		background: live_bg,
    		list: live
    	},
    	nba: {
    		title: nba_title,
    		background: nba_bg,
    		list: nba
    	},
    	nhl: {
    		title: nhl_title,
    		background: nhl_bg,
    		list: nhl
    	},
    };
}