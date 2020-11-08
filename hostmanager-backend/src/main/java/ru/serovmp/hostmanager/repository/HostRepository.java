package ru.serovmp.hostmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ru.serovmp.hostmanager.entity.Host;

@Repository
public interface HostRepository extends JpaRepository<Host, Long> {

}
