package ru.serovmp.hostmanager.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.serovmp.hostmanager.dto.*;
import ru.serovmp.hostmanager.entity.User;
import ru.serovmp.hostmanager.repository.*;
import ru.serovmp.hostmanager.util.EntityToDtoMapper;

import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExportAndImportService {
    private static final String SCHEMA_VERSION_0_BETA = "0b";
    private static final String SCHEMA_VERSION_1 = "1";

    private ProtocolRepository protocolRepository;
    private TagRepository tagRepository;
    private NoteRepository noteRepository;
    private LocationRepository locationRepository;
    private HostRepository hostRepository;

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private SubnetsRepository subnetsRepository;
    private SettingsRepository settingsRepository;
    private SettingsService settingsService;

    private EntityToDtoMapper entityToDtoMapper;

    @Autowired
    public ExportAndImportService(ProtocolRepository protocolRepository, TagRepository tagRepository, NoteRepository noteRepository, LocationRepository locationRepository, HostRepository hostRepository, UserRepository userRepository, RoleRepository roleRepository, SubnetsRepository subnetsRepository, SettingsRepository settingsRepository, SettingsService settingsService) {
        this.protocolRepository = protocolRepository;
        this.tagRepository = tagRepository;
        this.noteRepository = noteRepository;
        this.locationRepository = locationRepository;
        this.hostRepository = hostRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.subnetsRepository = subnetsRepository;
        this.settingsRepository = settingsRepository;
        this.settingsService = settingsService;
    }

    // Returns just a big map with all data by key
    public Map<String, Object> exportAll() {
        return Map.of(
                "meta", Map.of(
                        "schema", SCHEMA_VERSION_0_BETA,
                        "createdAt", new Date()
                ),
                "protocols", protocolRepository.findAll().stream().map(entityToDtoMapper::protocolToProtocolDto).collect(Collectors.toList()),
                "tags", tagRepository.findAll().stream().map(entityToDtoMapper::tagToTagDto).collect(Collectors.toList()),
                "notes", noteRepository.findAll().stream().map(entityToDtoMapper::noteToWholeNoteDto).collect(Collectors.toList()),
                "locations", locationRepository.findAll().stream().map(entityToDtoMapper::locationToLocationDto).collect(Collectors.toList()),
                "hosts", hostRepository.findAll().stream().map(HostExportDto::fromHost).collect(Collectors.toList()),

                "users", userRepository.findAll().stream().map(entityToDtoMapper::userToUserWithPwdDto).collect(Collectors.toList()),
                "roles", roleRepository.findAll().stream().map(r -> Map.of("id", r.getId(), "name", r.getName(), "description", r.getDescription())).collect(Collectors.toList()),
                "subnets", subnetsRepository.findAll(),
                "settings", userRepository.findAll().stream().map(User::getId).collect(Collectors.toMap(id -> id, settingsService::getSettingsForUser))
        );
    }

    public void importAll(Map<String, Object> importData) {

    }
}
