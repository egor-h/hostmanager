package ru.serovmp.hostmanager.util;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.controller.form.TreeForm;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface EntityToDtoMapper {
    EntityToDtoMapper INSTANCE = Mappers.getMapper(EntityToDtoMapper.class);

    void updateHost(HostForm form, @MappingTarget Host host);
    Host objectFormToHost(HostForm hostForm);

    @Mapping(source = "protocols", target = "protocols", qualifiedByName = "protocolsToProtocolDtoList")
    @Mapping(source = "tags", target = "tags", qualifiedByName = "tagsToTagDtoList")
    ObjectDto hostToObjectDto(Host host);

    @Named("tagsToTagDtoList")
    static List<TagDto> tagsToTagDtoList(Set<Tag> tags) {
        return tags.stream().map(INSTANCE::tagToTagDto).collect(Collectors.toList());
    }

    @Named("protocolsToProtocolDtoList")
    static List<ProtocolDto> protocolsToProtocolDtoList(Set<Protocol> protocols) {
        return protocols.stream().map(INSTANCE::protocolToProtocolDto).collect(Collectors.toList());
    }


    @Mapping(source = "children", target = "children", qualifiedByName = "getTreeItems")
    @Mapping(source = "parent", target = "parent", qualifiedByName = "getParentId")
    TreeItemDto treeItemToDto(TreeItem treeItem);

    @Named("getTreeItems")
    static List<TreeItemDto> getTreeItems(List<TreeItem> treeItems) {
        return treeItems.stream().map(INSTANCE::treeItemToDto).collect(Collectors.toList());
    }

    @Named("getParentId")
    static long getParentId(TreeItem treeItem) {
        return treeItem == null ? -1 : treeItem.getId();
    }

    void updateTreeItem(TreeForm treeForm, @MappingTarget TreeItem treeItem);
    TreeItem treeFromToEntity(TreeForm treeForm);

    LocationDto locationToLocationDto(Location location);

    @Mapping(source = "hosts", target = "hosts", qualifiedByName = "hostsEntityToIds")
    WholeNoteDto noteToWholeNoteDto(Note note);

    BriefNoteDto noteToBriefNoteDto(Note note);

    ProtocolDto protocolToProtocolDto(Protocol protocol);

    TagDto tagToTagDto(Tag tag);

    @Mapping(source = "roles", target = "roles", qualifiedByName = "userRolesToIds")
    UserDto userToUserDto(User user);

    @Mapping(source = "roles", target = "roles", qualifiedByName = "userRolesToIds")
    UserWithPasswordDto userToUserWithPwdDto(User user);

    @Named("hostsEntityToIds")
    static Set<Long> hostsEntityToIds(Set<Host> hosts) {
        return hosts.stream().map(Host::getId).collect(Collectors.toSet());
    }

    @Named("userRolesToIds")
    static Set<Long> userRolesToIds(Set<Role> roles) {
        return roles.stream().map(Role::getId).collect(Collectors.toSet());
    }
}
