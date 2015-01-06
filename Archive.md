---
layout: page
title: archive
---

## Posts

{% for post in site.posts %}
	* <a href="{{ post.url }}">{{post.title}}</a>
{% endfor %}