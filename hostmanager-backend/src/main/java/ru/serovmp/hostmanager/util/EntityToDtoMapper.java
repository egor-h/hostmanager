package ru.serovmp.hostmanager.util;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.*;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface EntityToDtoMapper {

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
