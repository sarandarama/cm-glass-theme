import './preview';
import './component';
import './config';

Shopware.Service('cmsService').registerCmsElement({
  name: '3d-cube',
  label: 'sw-cms.elements.3DCube.label',
  component: 'sw-cms-el-3d-cube',
  configComponent: 'sw-cms-el-config-3d-cube',
  previewComponent: 'sw-cms-el-preview-3d-cube',

  defaultConfig: {
    sliderItems: {
      source: 'static',
      value: [],
      type: Array,
      required: true,
      entity: {
        name: 'media',
      },
    },
  },

  enrich: function enrich(elem, data) {
    if (Object.keys(data).length < 1) {
      return;
    }

    Object.keys(elem.config).forEach((configKey) => {
      const entity = elem.config[configKey].entity;

      if (!entity) {
        return;
      }

      const entityKey = entity.name;
      if (!data[`entity-${entityKey}`]) {
        return;
      }

      elem.data[configKey] = [];
      elem.config[configKey].value.forEach((sliderItem) => {
        elem.data[configKey].push({
          newTab: sliderItem.newTab,
          url: sliderItem.url,
          media: data[`entity-${entityKey}`].get(sliderItem.mediaId),
        });
      });
    });
  },
});