import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons/';
import { uniq } from 'lodash';
import { computed, ComputedRef, Ref, ref } from 'vue';

import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import feathers from './useBackend';

let areTagsLoaded = false;

export const tagGroupListItems = ref<ListItem[]>();
export const tags = ref<NFCTag[]>();

export async function loadTagGroups(): Promise<void> {
  const allTags = (await feathers.service('nfc-tags').find()) as Paginated<NFCTag>;
  const tagGroupNames = uniq(allTags.data.map((tag: NFCTag) => tag.group));
  tagGroupListItems.value = tagGroupNames.map((groupName: string) => new ListItem(groupName));
}

export type NFCTagGroup = {
  name: string;
  tags: NFCTag[];
};

export const tagsOrderedByGroups = computed(() =>
  Object.values(
    (tags.value || []).reduce((previous, item) => {
      if (!previous[item.group]) {
        previous[item.group] = { name: item.group, tags: [] } as NFCTagGroup;
      }
      previous[item.group].tags.push(item);
      return previous;
    }, {} as Record<string, NFCTagGroup>)
  )
);

async function loadTags(): Promise<void> {
  if (areTagsLoaded) {
    return;
  }

  areTagsLoaded = true;

  const res = (await feathers.service('nfc-tags').find()) as Paginated<NFCTag>;
  tags.value = res.data;

  feathers.service('nfc-tags').on('removed', (tag: NFCTag): void => {
    tags.value = (tags.value || []).filter((_tag) => _tag._id !== tag._id);
  });

  feathers.service('nfc-tags').on('created', (tag: NFCTag): void => {
    tags.value = [...(tags.value || []), tag];
  });

  feathers.service('nfc-tags').on('patched', (patchedTag: NFCTag): void => {
    tags.value = (tags.value || []).map((tag) => {
      if (tag._id === patchedTag._id) {
        return patchedTag;
      }

      return tag;
    });
  });
}

export const getIsNfcTagValid = (nfcTag: Ref<NFCTag | undefined>): ComputedRef<boolean> =>
  computed(() => {
    if (!nfcTag.value) {
      return false;
    }

    const tag = nfcTag.value;
    return !!(tag.nfcData && tag.name && tag.group && tag.trackUri && tag.imageUrl);
  });

feathers.on('login', () => {
  void loadTags();
});
