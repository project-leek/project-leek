import { Paginated } from '@feathersjs/feathers';
import { NFCTag } from '@leek/commons/';
import { uniq } from 'lodash';
import { computed, ref } from 'vue';

import ListItem from '../components/uiBlocks/Dropdown.ListItem';
import feathers from './useBackend';

export const groupNames = ref<string[]>([]);
export const groupListItems = computed(() =>
  groupNames.value.map((groupName: string) => new ListItem(groupName))
);

export async function loadTagGroups(): Promise<void> {
  const allTags = (await feathers.service('nfc-tags').find()) as Paginated<NFCTag>;
  groupNames.value = uniq(allTags.data.map((tag: NFCTag) => tag.group));
}
