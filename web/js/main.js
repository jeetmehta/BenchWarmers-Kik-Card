App.populator('articleList', function (page) {
  MyAPI.getArticles(function (meta, articles) {
    logStuff(articles);
  });

  function logStuff(data) {


    console.log(data);
    data.forEach(function (item) {
        var artTitle = item['title'];
        var artSum = item['summary'];
        var artDate = item['pubDate'];
        var artLink = item['link'];
        var imgLink = item['media:content']['@']['url'];

        var section = $('<div />').addClass('app-section');
        var description = $('<div />').addClass('description');
        var title = $('<h4 />');
        var summary = $('<div />').html(artSum);
        var button = $('<div />').addClass('app-button myButtons');
        var kikbutton = $('<div />').addClass('app-button myButtons');

        $(page).find('.app-content').append(section);
        section.append(description);
        section.append(button);
        section.append(kikbutton);
        description.append(title);
        description.append(summary);
        
        title.text(artTitle);
        button.text('Read More');
        kikbutton.text('Kik');

        button.clickable().on('click', function() {
          cards.browser.open(artLink);
        });

        kikbutton.clickable().on('click', function() {
          var x = JSON.stringify(item);
          console.log(x);
          cards.kik.send({
            title: artTitle,
            text: 'Check out what I found!',
            pic: imgLink,
            big: false,
            linkData: x
          });
        });
    });
  }
});

App.populator('articleView', function(page, linkData) {
  $(page).find('#articleTitle').text(linkData['title'].slice(0,16) + "...");
  $(page).find('#kikBut').text('Kik');
  $(page).find('#backBut').text('Back');
  $(page).find('#backBut').on('click', function() {
    App.load('articleList');
  });
  $(page).find('#articleContent').text(linkData['description'])
});

   if (cards.browser && cards.browser.linkData) {
     // Card was launched by a conversation
     App.load('articleView', cards.browser.linkData);
     //cards.kik.returnToConversation(); // return to conversation
   }
   else {
     App.load('articleList');
   }
   /*
      try {
        App.restore();
      }
      catch (err) {
        App.load('articleList');
      }*/
