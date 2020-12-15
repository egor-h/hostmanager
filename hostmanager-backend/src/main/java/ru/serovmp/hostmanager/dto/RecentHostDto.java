package ru.serovmp.hostmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.serovmp.hostmanager.entity.Host;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecentHostDto {
    private String name;
    private String address;
//    private String createdBy;
    private Date createdAt;

    public RecentHostDto(Host host) {
        this.name = host.getName();
        this.address = host.getAddress();
//        this.createdBy = host.createdBy();
        this.createdAt = host.getCreatedAt();
    }
}
