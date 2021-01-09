package ru.serovmp.hostmanager.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HostDto {
    private long id;
    private long parentId;
    private String name;
    private String address;
    private Date createdAt;
    @JsonProperty("dir")
    private boolean isDir;
    private boolean enabled;
    @JsonProperty("chld")
    private Set<HostDto> children;
    private Set<TagDto> tags;
    private Set<Long> protocols;
}
