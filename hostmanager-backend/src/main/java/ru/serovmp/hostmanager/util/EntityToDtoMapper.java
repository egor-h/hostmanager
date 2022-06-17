package ru.serovmp.hostmanager.util;

import org.mapstruct.*;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import ru.serovmp.hostmanager.controller.form.HostForm;
import ru.serovmp.hostmanager.controller.form.TreeForm;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.*;
import ru.serovmp.hostmanager.repository.ProtocolRepository;
import ru.serovmp.hostmanager.repository.TagRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class EntityToDtoMapper {
    static final EntityToDtoMapper INSTANCE = Mappers.getMapper(EntityToDtoMapper.class);
    @Autowired
    protected TagRepository tagRepository;
    @Autowired
    protected ProtocolRepository protocolRepository;

    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "protocols", ignore = true)
    public abstract void updateHost(HostForm form, @MappingTarget Host host);

    @Mapping(source = "tags", target = "tags", qualifiedByName = "findTagsByName")
    @Mapping(source = "protocols", target = "protocols", qualifiedByName = "findProtocolsById")
    public abstract Host objectFormToHost(HostForm hostForm);

    @Named("findTagsByName")
    public Set<Tag> findTagsByName(List<String> tagNames) {
        return tagNames.stream().map(tagRepository::findByName).map(Optional::get).collect(Collectors.toSet());
    }

    @Named("findProtocolsById")
    public Set<Protocol> findProtocolsById(List<Long> protocolIds) {
        return protocolIds.stream().map(protocolRepository::findById).map(Optional::get).collect(Collectors.toSet());
    }

    @Mapping(source = "protocols", target = "protocols", qualifiedByName = "protocolsToProtocolDtoList")
    @Mapping(source = "tags", target = "tags", qualifiedByName = "tagsToTagDtoList")
    public abstract ObjectDto hostToObjectDto(Host host);

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
    public abstract TreeItemDto treeItemToDto(TreeItem treeItem);

    @Named("getTreeItems")
    static List<TreeItemDto> getTreeItems(List<TreeItem> treeItems) {
        return treeItems.stream().map(INSTANCE::treeItemToDto).collect(Collectors.toList());
    }

    @Named("getParentId")
    static long getParentId(TreeItem treeItem) {
        return treeItem == null ? -1 : treeItem.getId();
    }

    public abstract void updateTreeItem(TreeForm treeForm, @MappingTarget TreeItem treeItem);
    public abstract TreeItem treeFromToEntity(TreeForm treeForm);

    public abstract LocationDto locationToLocationDto(Location location);

    @Mapping(source = "hosts", target = "hosts", qualifiedByName = "hostsEntityToIds")
    public abstract WholeNoteDto noteToWholeNoteDto(Note note);

    public abstract BriefNoteDto noteToBriefNoteDto(Note note);

    public abstract ProtocolDto protocolToProtocolDto(Protocol protocol);

    public abstract TagDto tagToTagDto(Tag tag);

    @Mapping(source = "roles", target = "roles", qualifiedByName = "userRolesToIds")
    public abstract UserDto userToUserDto(User user);

    @Mapping(source = "roles", target = "roles", qualifiedByName = "userRolesToIds")
    public abstract UserWithPasswordDto userToUserWithPwdDto(User user);

    @Named("hostsEntityToIds")
    static Set<Long> hostsEntityToIds(Set<Host> hosts) {
        return hosts.stream().map(Host::getId).collect(Collectors.toSet());
    }

    @Named("userRolesToIds")
    static Set<Long> userRolesToIds(Set<Role> roles) {
        return roles.stream().map(Role::getId).collect(Collectors.toSet());
    }
}
