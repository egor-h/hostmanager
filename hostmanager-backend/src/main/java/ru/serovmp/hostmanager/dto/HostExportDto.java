package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.Host;
import ru.serovmp.hostmanager.entity.Protocol;
import ru.serovmp.hostmanager.entity.Tag;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HostExportDto {

    private long id;
    private long parentId;
    private String name;
    private String address;
    private int port;
    private Date createdAt;
    private boolean isDir;
    private boolean enabled;
    private List<Long> tags;
    private List<Long> protocols;

    public static HostExportDto fromHost(Host host) {
        return HostExportDto.builder()
                .id(host.getId())
                .parentId(host.getParent().getId())
                .name(host.getName())
                .address(host.getAddress())
                .port(host.getPort())
                .createdAt(host.getCreatedAt())
                .isDir(host.isDir())
                .enabled(host.isEnabled())
                .tags(host.getTags().stream().map(Tag::getId).collect(Collectors.toList()))
                .protocols(host.getProtocols().stream().map(Protocol::getId).collect(Collectors.toList()))
                .build();
    }
}
