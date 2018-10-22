
var creative = {};
    creative.animation = {};
    creative.animation.transitionTime = 1;
    creative.animation.pauseTime = 1.5;
    creative.animation.currentLoop = 0;
    creative.animation.totalLoopCount = 2;

    creative.animation.timelines = {};
    creative.animation.timelines.root = null;
    creative.animation.timelines.cta = null;

    creative.dom = {};

    creative.config = {};
    creative.config.stageHeight = 0;
    creative.config.stageWidth = 0;
    creative.config.frame = 0;

    <% if (bannerFramework == "CREATEJS") { %>
    /**
     * Createjs configuration
     */
    creative.createjs = {};
    creative.createjs.compositionId = "F001640952B14D999E7B4A9EA95357B3";
    creative.createjs.root = {};
    creative.createjs.movieclips = [];
    <% } %>

    <% if (includeLegalBar) { %>
    /**
     * Legal configuration
     */
    creative.config.legal = {
        isLong: true,
        content:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci. Nam congue, pede vitae dapibus aliquet, elit magna vulputate arcu, vel tempus metus leo non est. Etiam sit amet lectus quis est congue mollis. Phasellus congue lacus eget neque. Phasellus ornare, ante vitae consectetuer consequat, purus sapien ultricies dolor, et mollis pede metus eget nisi. Praesent sodales velit quis augue. Cras suscipit, urna at aliquam rhoncus, urna quam viverra nisi, in interdum massa nibh nec erat.'
    }
    <% } %>

Banner.prototype.creative = creative;