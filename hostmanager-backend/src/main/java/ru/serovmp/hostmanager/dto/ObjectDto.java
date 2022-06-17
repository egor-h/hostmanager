package ru.serovmp.hostmanager.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.AbstractAuditableEntity;

import java.util.Date;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ObjectDto {
    private long id;
    private long parentId;
    private String name;
    private String address;
    private int port;
    private Date createdAt;
    private boolean enabled;
    private List<TagDto> tags;
    private List<ProtocolDto> protocols;
}
