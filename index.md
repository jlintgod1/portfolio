---
layout: default
---

Jlintgod's WIP Portfolio. Currently contains placeholder content to test display functionality and will be updated later.

# 3D
{% for model in site.models %}
    {% assign loopingIndex = forloop.index0 | modulo: 4 %}
    {% if loopingIndex == 0 %}
<article class="gallery">
    {% endif %}

    {% assign preview_url = "/assets/images/previews/" %}
    {% if model.use_unknown_icon %}
    {% assign preview_url = preview_url | append: "unknown.png" | relative_url %}
    {% else %}
    {% assign preview_url = preview_url | append: model.slug | append: ".png" | relative_url %}
    {% endif %}

<article class="gallery-item">
<a href="{{ model.url | relative_url }}">
<img src="{{preview_url}}" />
<br>
{{model.title}}
</a>
</article>


    {% if forloop.last or loopingIndex == 3 %}
</article>
    {% endif %}
{% endfor %}


# Copyright Notices
All 3D content is displayed with [Babylon.js](https://www.babylonjs.com/), an open source rendering engine licensed under the [Apache 2.0 License](https://apache.org/licenses/LICENSE-2.0.txt). All assets(including meshes and textures) used from Babylon.js's [asset respository](https://github.com/BabylonJS/Assets) are licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by-sa/4.0/).