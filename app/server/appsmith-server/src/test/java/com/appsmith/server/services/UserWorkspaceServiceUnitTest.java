package com.appsmith.server.services;

import com.appsmith.server.acl.AclPermission;
import com.appsmith.server.acl.RoleGraph;
import com.appsmith.server.constants.FieldName;
import com.appsmith.server.domains.PermissionGroup;
import com.appsmith.server.domains.Workspace;
import com.appsmith.server.dtos.PermissionGroupInfoDTO;
import com.appsmith.server.dtos.UserAndPermissionGroupDTO;
import com.appsmith.server.exceptions.AppsmithError;
import com.appsmith.server.helpers.PolicyUtils;
import com.appsmith.server.notifications.EmailSender;
import com.appsmith.server.repositories.ApplicationRepository;
import com.appsmith.server.repositories.AssetRepository;
import com.appsmith.server.repositories.PluginRepository;
import com.appsmith.server.repositories.UserDataRepository;
import com.appsmith.server.repositories.UserRepository;
import com.appsmith.server.repositories.WorkspaceRepository;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.test.StepVerifier;

import javax.validation.Validator;
import java.util.List;

import static com.appsmith.server.acl.AclPermission.READ_WORKSPACES;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@RunWith(SpringJUnit4ClassRunner.class)
public class UserWorkspaceServiceUnitTest {

    @MockBean PluginRepository pluginRepository;
    @MockBean SessionUserService sessionUserService;
    @MockBean UserRepository userRepository;
    @MockBean RoleGraph roleGraph;
    @MockBean AssetRepository assetRepository;
    @MockBean AssetService assetService;
    @MockBean Scheduler scheduler;
    @MockBean MongoConverter mongoConverter;
    @MockBean ReactiveMongoTemplate reactiveMongoTemplate;
    @MockBean WorkspaceRepository workspaceRepository;
    @MockBean Validator validator;
    @MockBean AnalyticsService analyticsService;
    @MockBean ApplicationRepository applicationRepository;
    @MockBean UserDataRepository userDataRepository;
    @MockBean EmailSender emailSender;
    @MockBean UserDataService userDataService;

    @MockBean PermissionGroupService permissionGroupService;

    @MockBean PolicyUtils policyUtils;

    @MockBean UserService userService;

    @MockBean TenantService tenantService;

    UserWorkspaceService userWorkspaceService;

    ModelMapper modelMapper;

    @Before
    public void setUp() {
        modelMapper = new ModelMapper();
        userWorkspaceService = new UserWorkspaceServiceImpl(sessionUserService, workspaceRepository, userRepository,
            userDataRepository, policyUtils, emailSender, userDataService, permissionGroupService, tenantService);
    }

   @Test
   public void whenMapPermissionGroup_thenConvertsToPermissionGroupInfoDTO() {
       PermissionGroup permissionGroup = new PermissionGroup();
       permissionGroup.setName("Test");
       permissionGroup.setId("123");
       permissionGroup.setDescription("Test");
       PermissionGroupInfoDTO permissionGroupInfoDTO = modelMapper.map(permissionGroup, PermissionGroupInfoDTO.class);
       Assert.assertEquals(permissionGroup.getName(), permissionGroupInfoDTO.getName());
       Assert.assertEquals(permissionGroup.getId(), permissionGroupInfoDTO.getId());
       Assert.assertEquals(permissionGroup.getDescription(), permissionGroupInfoDTO.getDescription());
   }

    @Test
    public void getWorkspaceMembers_WhenRoleIsNull_ReturnsEmptyList() {
        // create a workspace object
        Workspace testWorkspace = new Workspace();
        testWorkspace.setName("Get All Members For Workspace Test");
        testWorkspace.setDomain("test.com");
        testWorkspace.setWebsite("https://test.com");
        testWorkspace.setId("test-org-id");

        // mock repository methods so that they return the objects we've created
        Mockito.when(workspaceRepository.findById("test-org-id", READ_WORKSPACES))
                .thenReturn(Mono.just(testWorkspace));
        Mockito.when(permissionGroupService.getByDefaultWorkspace(any(), eq(AclPermission.READ_PERMISSION_GROUPS)))
                .thenReturn(Flux.empty());
        Mockito.when(userRepository.findAllById(ArgumentMatchers.<Iterable<String>>any()))
                .thenReturn(Flux.empty());

        Mono<List<UserAndPermissionGroupDTO>> workspaceMembers = userWorkspaceService.getWorkspaceMembers(testWorkspace.getId());
        StepVerifier
                .create(workspaceMembers)
                .assertNext(userAndGroupDTOs -> {
                    Assert.assertEquals(0, userAndGroupDTOs.size());
                })
                .verifyComplete();
    }

    @Test
    public void getWorkspaceMembers_WhenNoOrgFound_ThrowsException() {
        String sampleWorkspaceId = "test-org-id";
        // mock repository methods so that they return the objects we've created
        Mockito.when(workspaceRepository.findById(sampleWorkspaceId, READ_WORKSPACES))
                .thenReturn(Mono.empty());
        Mockito.when(permissionGroupService.getByDefaultWorkspace(any(), eq(AclPermission.READ_PERMISSION_GROUPS)))
                .thenReturn(Flux.empty());
        Mockito.when(userRepository.findAllById(ArgumentMatchers.<Iterable<String>>any()))
                .thenReturn(Flux.empty());

        Mono<List<UserAndPermissionGroupDTO>> workspaceMembers = userWorkspaceService.getWorkspaceMembers(sampleWorkspaceId);
        StepVerifier
                .create(workspaceMembers)
                .expectErrorMessage(AppsmithError.NO_RESOURCE_FOUND.getMessage(FieldName.WORKSPACE, sampleWorkspaceId))
                .verify();
    }
}